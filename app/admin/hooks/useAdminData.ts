"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, type Role, type UserWithRole } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface UseAdminDataReturn {
  // Auth state
  user: User | null;
  userRole: string | null;
  isAdmin: boolean;
  loading: boolean;
  authLoading: boolean;

  // Data
  users: UserWithRole[];
  roles: Role[];
  filteredUsers: UserWithRole[];

  // UI state
  error: string | null;
  successMessage: string | null;
  searchQuery: string;

  // Auth actions
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;

  // Data actions
  fetchData: () => Promise<void>;
  handleRoleChange: (userId: string, newRoleName: string) => Promise<void>;
  handleCreateUser: (data: CreateUserData) => Promise<boolean>;
  handleDeleteUser: (userId: string, userEmail: string, confirmMessage: string) => Promise<void>;

  // UI actions
  setSearchQuery: (query: string) => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number | null;
}

export function useAdminData(translations: {
  selectRoleError: string;
  errorCreatingUser: string;
  userCreatedSuccess: string;
  serverError: string;
  errorDeletingUser: string;
  userDeletedSuccess: string;
}): UseAdminDataReturn {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserRole = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("users")
      .select("roles(name)")
      .eq("id", userId)
      .single();

    if (data?.roles) {
      const roles = data.roles as unknown as { name: string };
      setUserRole(roles.name);
    }
  }, []);

  const fetchData = useCallback(async () => {
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select(`*, roles (*)`)
      .order("created_at", { ascending: false });

    if (usersError) {
      setError(usersError.message);
      return;
    }

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
  }, []);

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      await fetchUserRole(session.user.id);
      await fetchData();
    }
    setLoading(false);
  }, [fetchUserRole, fetchData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = useCallback(async (email: string, password: string) => {
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
  }, [fetchUserRole, fetchData]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setUsers([]);
  }, []);

  const handleRoleChange = useCallback(async (userId: string, newRoleName: string) => {
    const { error } = await supabase.rpc("change_user_role", {
      target_user_id: userId,
      new_role_name: newRoleName,
    });

    if (error) {
      setError(error.message);
      return;
    }

    await fetchData();
  }, [fetchData]);

  const handleCreateUser = useCallback(async (data: CreateUserData): Promise<boolean> => {
    setError(null);
    setSuccessMessage(null);

    if (!data.roleId) {
      setError(translations.selectRoleError);
      return false;
    }

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          roleId: data.roleId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || translations.errorCreatingUser);
        return false;
      }

      setSuccessMessage(translations.userCreatedSuccess);
      await fetchData();
      return true;
    } catch {
      setError(translations.serverError);
      return false;
    }
  }, [fetchData, translations]);

  const handleDeleteUser = useCallback(async (userId: string, userEmail: string, confirmMessage: string) => {
    if (!confirm(`${confirmMessage} ${userEmail}?`)) {
      return;
    }

    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/admin/delete-user?userId=${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || translations.errorDeletingUser);
        return;
      }

      setSuccessMessage(translations.userDeletedSuccess);
      await fetchData();
    } catch {
      setError(translations.serverError);
    }
  }, [fetchData, translations]);

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    return (
      u.email.toLowerCase().includes(query) ||
      (u.first_name?.toLowerCase() || "").includes(query) ||
      (u.last_name?.toLowerCase() || "").includes(query) ||
      u.roles.name.toLowerCase().includes(query)
    );
  });

  const isAdmin = userRole === "admin" || userRole === "super_admin";

  return {
    user,
    userRole,
    isAdmin,
    loading,
    authLoading,
    users,
    roles,
    filteredUsers,
    error,
    successMessage,
    searchQuery,
    handleLogin,
    handleLogout,
    fetchData,
    handleRoleChange,
    handleCreateUser,
    handleDeleteUser,
    setSearchQuery,
    setError,
    setSuccessMessage,
  };
}
