"use client";

import { useState } from "react";
import type { Role } from "../../lib/supabase";

interface AddUserFormProps {
  roles: Role[];
  userRole: string | null;
  onCreateUser: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: number | null;
  }) => Promise<boolean>;
  translations: {
    addUser: string;
    addUserSubtitle: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    selectRole: string;
    createUser: string;
    creating: string;
    cancel: string;
  };
}

export default function AddUserForm({
  roles,
  userRole,
  onCreateUser,
  translations: t,
}: AddUserFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const success = await onCreateUser({
      email,
      password,
      firstName,
      lastName,
      roleId,
    });

    if (success) {
      resetForm();
      setShowForm(false);
    }

    setLoading(false);
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setRoleId(null);
  }

  return (
    <div
      className={`flex-shrink-0 rounded-lg shadow-md mb-2 sm:mb-4 ${
        showForm ? "bg-white" : "bg-gradient-to-r from-teal to-teal/80"
      }`}
    >
      <div
        className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center cursor-pointer transition-colors ${
          showForm
            ? "border-b border-gray-200 hover:bg-gray-50"
            : "hover:from-teal/90 hover:to-teal/70"
        }`}
        onClick={() => setShowForm(!showForm)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
              showForm ? "bg-teal/10" : "bg-white/20"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={showForm ? "text-teal" : "text-white"}
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="16" y1="11" x2="22" y2="11" />
            </svg>
          </div>
          <div>
            <h2
              className={`text-sm sm:text-lg md:text-xl font-bold ${
                showForm ? "text-dark" : "text-white"
              }`}
            >
              {t.addUser}
            </h2>
            {!showForm && (
              <p className="text-white/80 text-[10px] sm:text-xs md:text-sm hidden sm:block">
                {t.addUserSubtitle}
              </p>
            )}
          </div>
        </div>
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
            showForm ? "bg-gray-100" : "bg-white/20"
          }`}
        >
          <span
            className={`text-lg sm:text-xl font-bold ${
              showForm ? "text-dark" : "text-white"
            }`}
          >
            {showForm ? "−" : "+"}
          </span>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 md:p-6 max-h-[50vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                className="block text-dark mb-2"
                style={{ fontSize: "14px" }}
              >
                {t.email} *
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
              <label
                className="block text-dark mb-2"
                style={{ fontSize: "14px" }}
              >
                {t.password} *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
                minLength={6}
              />
            </div>
            <div>
              <label
                className="block text-dark mb-2"
                style={{ fontSize: "14px" }}
              >
                {t.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label
                className="block text-dark mb-2"
                style={{ fontSize: "14px" }}
              >
                {t.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-dark mb-2"
                style={{ fontSize: "14px" }}
              >
                {t.role} *
              </label>
              <select
                value={roleId || ""}
                onChange={(e) => setRoleId(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              >
                <option value="">{t.selectRole}</option>
                {roles.map((role) => (
                  <option
                    key={role.id}
                    value={role.id}
                    disabled={
                      userRole !== "super_admin" &&
                      (role.name === "super_admin" || role.name === "admin")
                    }
                  >
                    {role.name} - {role.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
            >
              {loading ? t.creating : t.createUser}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="bg-gray-300 text-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto text-sm sm:text-base"
            >
              {t.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
