"use client";

import { useState, useEffect } from "react";
import { supabase, type Role, type UserWithRole } from "../lib/supabase";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      await fetchUserRole(session.user.id);
      await fetchData();
    }
    setLoading(false);
  }

  async function fetchUserRole(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("roles(name)")
      .eq("id", userId)
      .single();

    if (data?.roles) {
      setUserRole((data.roles as any).name);
    }
  }

  async function fetchData() {
    // Fetch users with their roles
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select(`
        *,
        roles (*)
      `)
      .order("created_at", { ascending: false });

    if (usersError) {
      setError(usersError.message);
      return;
    }

    // Fetch all roles
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("*")
      .order("id");

    if (rolesError) {
      setError(rolesError.message);
      return;
    }

    setUsers(usersData || []);
    setRoles(rolesData || []);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setAuthLoading(false);
      return;
    }

    if (data.user) {
      setUser(data.user);
      await fetchUserRole(data.user.id);
      await fetchData();
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setUsers([]);
  }

  async function handleRoleChange(userId: string, newRoleName: string) {
    const { error } = await supabase.rpc("change_user_role", {
      target_user_id: userId,
      new_role_name: newRoleName,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Refresh data
    await fetchData();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-light flex items-center justify-center">
        <p className="text-dark">Chargement...</p>
      </main>
    );
  }

  // Login form if not authenticated
  if (!user) {
    return (
      <main className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-dark mb-6 text-center" style={{ fontSize: "32px" }}>
            Admin Login
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-dark mb-2" style={{ fontSize: "14px" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div>
              <label className="block text-dark mb-2" style={{ fontSize: "14px" }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-teal text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {authLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Check if user has admin access
  const isAdmin = userRole === "admin" || userRole === "super_admin";

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-light flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-dark mb-4" style={{ fontSize: "32px" }}>
            Acces refuse
          </h1>
          <p className="text-dark mb-6">
            Vous n&apos;avez pas les permissions pour acceder a cette page.
          </p>
          <p className="text-dark mb-6" style={{ fontSize: "14px" }}>
            Votre role: <span className="font-bold">{userRole}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-coral text-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Se deconnecter
          </button>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="min-h-screen bg-light py-8 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-dark" style={{ fontSize: "32px" }}>
              Admin Dashboard
            </h1>
            <p className="text-dark" style={{ fontSize: "14px" }}>
              Connecte en tant que: <span className="font-bold">{user.email}</span> ({userRole})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-coral text-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Se deconnecter
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">
              x
            </button>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-dark" style={{ fontSize: "24px" }}>
              Gestion des utilisateurs ({users.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Role actuel
                  </th>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Changer le role
                  </th>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-dark font-bold" style={{ fontSize: "14px" }}>
                    Date d&apos;inscription
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-dark" style={{ fontSize: "14px" }}>
                      {u.email}
                    </td>
                    <td className="px-6 py-4 text-dark" style={{ fontSize: "14px" }}>
                      {u.first_name || "-"} {u.last_name || ""}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.roles.name === "super_admin"
                            ? "bg-purple-100 text-purple-800"
                            : u.roles.name === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : u.roles.name.startsWith("professionnel")
                            ? "bg-teal/20 text-teal"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {u.roles.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.roles.name}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                        style={{ fontSize: "14px" }}
                        disabled={u.id === user.id}
                      >
                        {roles.map((role) => (
                          <option
                            key={role.id}
                            value={role.name}
                            disabled={
                              userRole !== "super_admin" &&
                              (role.name === "super_admin" || role.name === "admin")
                            }
                          >
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.is_active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark" style={{ fontSize: "14px" }}>
                      {new Date(u.created_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="px-6 py-8 text-center text-dark">
              Aucun utilisateur trouve.
            </div>
          )}
        </div>

        {/* Roles Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-dark mb-4" style={{ fontSize: "18px" }}>
            Roles disponibles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    role.name === "super_admin"
                      ? "bg-purple-100 text-purple-800"
                      : role.name === "admin"
                      ? "bg-blue-100 text-blue-800"
                      : role.name.startsWith("professionnel")
                      ? "bg-teal/20 text-teal"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {role.name}
                </span>
                <p className="mt-2 text-dark" style={{ fontSize: "12px" }}>
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
