"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";
import { useAdminData } from "./hooks/useAdminData";
import AddUserForm from "./components/AddUserForm";

// Helper function to get user initials
function getInitials(firstName: string | null, lastName: string | null, email: string): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

// Helper function to get a consistent color based on string
function getAvatarColor(str: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function AdminPage() {
  const { language } = useLanguage();
  const t = translations[language];

  // Use custom hook for all data management
  const {
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
  } = useAdminData({
    selectRoleError: t.selectRoleError,
    errorCreatingUser: t.errorCreatingUser,
    userCreatedSuccess: t.userCreatedSuccess,
    serverError: t.serverError,
    errorDeletingUser: t.errorDeletingUser,
    userDeletedSuccess: t.userDeletedSuccess,
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    await handleLogin(loginEmail, loginPassword);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-light flex items-center justify-center">
        <p className="text-dark">{t.loading}</p>
      </main>
    );
  }

  // Login form if not authenticated
  if (!user) {
    return (
      <main className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-dark mb-6 text-center" style={{ fontSize: "32px" }}>
            {t.adminLogin}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label className="block text-dark mb-2" style={{ fontSize: "14px" }}>
                {t.email}
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div>
              <label className="block text-dark mb-2" style={{ fontSize: "14px" }}>
                {t.password}
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-teal text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {authLoading ? t.connecting : t.connect}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-light flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-dark mb-4" style={{ fontSize: "32px" }}>
            {t.accessDenied}
          </h1>
          <p className="text-dark mb-6">
            {t.noPermission}
          </p>
          <p className="text-dark mb-6" style={{ fontSize: "14px" }}>
            {t.yourRole}: <span className="font-bold">{userRole}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-coral text-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.logout}
          </button>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="h-screen bg-light flex flex-col overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full py-2 sm:py-4 md:py-6 px-2 sm:px-4 md:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="flex-shrink-0 inline-flex items-center gap-1 sm:gap-2 text-dark hover:text-teal transition-colors mb-2 sm:mb-3 text-xs sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          {t.backToSite}
        </Link>

        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-dark text-lg sm:text-2xl md:text-3xl font-bold">
              {t.adminDashboard}
            </h1>
            <p className="text-dark text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 truncate">
              <span className="hidden sm:inline">{t.connectedAs}: </span>
              <span className="font-bold">{user.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex-shrink-0 bg-coral text-dark font-bold px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm md:text-base"
          >
            <span className="hidden sm:inline">{t.logout}</span>
            <span className="sm:hidden">{t.logoutShort}</span>
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="flex-shrink-0 grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-[10px] sm:text-xs">{t.total}</p>
                <p className="text-dark text-lg sm:text-2xl font-bold">{users.length}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-[10px] sm:text-xs">{t.active}</p>
                <p className="text-green-600 text-lg sm:text-2xl font-bold">
                  {users.filter((u) => u.is_active).length}
                </p>
              </div>
              <div className="hidden sm:flex w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-[10px] sm:text-xs">{t.inactive}</p>
                <p className="text-red-600 text-lg sm:text-2xl font-bold">
                  {users.filter((u) => !u.is_active).length}
                </p>
              </div>
              <div className="hidden sm:flex w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-[10px] sm:text-xs">{t.admins}</p>
                <p className="text-purple-600 text-lg sm:text-2xl font-bold">
                  {users.filter((u) => u.roles.name === "admin" || u.roles.name === "super_admin").length}
                </p>
              </div>
              <div className="hidden sm:flex w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {(error || successMessage) && (
          <div className="flex-shrink-0 mb-4 space-y-2">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {error}
                <button onClick={() => setError(null)} className="float-right font-bold">
                  ×
                </button>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                {successMessage}
                <button onClick={() => setSuccessMessage(null)} className="float-right font-bold">
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add New User Section */}
        <AddUserForm
          roles={roles}
          userRole={userRole}
          onCreateUser={handleCreateUser}
          translations={{
            addUser: t.addUser,
            addUserSubtitle: t.addUserSubtitle,
            email: t.email,
            password: t.password,
            firstName: t.firstName,
            lastName: t.lastName,
            role: t.role,
            selectRole: t.selectRole,
            createUser: t.createUser,
            creating: t.creating,
            cancel: t.cancel,
          }}
        />

        {/* Users Section */}
        <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
          <div className="flex-shrink-0 px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <h2 className="text-dark text-xs sm:text-base md:text-xl font-bold whitespace-nowrap">
                  {t.users}
                  <span className="text-gray-400 font-normal ml-1">({filteredUsers.length}/{users.length})</span>
                </h2>
                <button
                  onClick={() => fetchData()}
                  className="p-1 sm:p-2 text-gray-500 hover:text-teal hover:bg-gray-100 rounded-lg transition-colors"
                  title={t.refresh}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                </button>
              </div>
              <div className="relative flex-1 max-w-[180px] sm:max-w-[250px]">
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal text-xs sm:text-sm"
                />
                <svg
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="flex-1 overflow-y-auto block lg:hidden">
            {filteredUsers.map((u) => (
              <div key={u.id} className="p-2 sm:p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div
                      className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${getAvatarColor(u.email)}`}
                    >
                      {getInitials(u.first_name, u.last_name, u.email)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-dark font-medium text-xs sm:text-sm truncate">{u.email}</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                        {u.first_name || "-"} {u.last_name || ""}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`ml-1 sm:ml-2 flex-shrink-0 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                      u.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {u.is_active ? t.activeStatus : t.inactiveStatus}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
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
                  <span className="text-gray-500 text-[10px] sm:text-xs py-0.5 sm:py-1">
                    {new Date(u.created_at).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <select
                    value={u.roles.name}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal text-xs sm:text-sm"
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
                  <button
                    onClick={() => handleDeleteUser(u.id, u.email, t.confirmDelete)}
                    disabled={u.id === user.id}
                    className="flex-shrink-0 bg-red-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    title={u.id === user.id ? t.cannotDeleteSelf : t.delete}
                  >
                    <span className="hidden sm:inline">{t.delete}</span>
                    <span className="sm:hidden">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:flex lg:flex-col flex-1 overflow-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[22%]">
                    {t.email}
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[12%]">
                    {t.name}
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[12%]">
                    {t.currentRole}
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[15%]">
                    {t.changeRole}
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[10%]">
                    {t.status}
                  </th>
                  <th className="hidden xl:table-cell px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[14%]">
                    {t.registrationDate}
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-dark font-bold text-sm w-[15%] xl:w-[15%]">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-3 xl:px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs ${getAvatarColor(u.email)}`}
                        >
                          {getInitials(u.first_name, u.last_name, u.email)}
                        </div>
                        <span className="text-dark text-sm truncate">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-3 xl:px-4 py-3 text-dark text-sm truncate">
                      {u.first_name || "-"} {u.last_name || ""}
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                    <td className="px-3 xl:px-4 py-3">
                      <select
                        value={u.roles.name}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal text-xs"
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
                    <td className="px-3 xl:px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.is_active ? t.activeStatus : t.inactiveStatus}
                      </span>
                    </td>
                    <td className="hidden xl:table-cell px-3 xl:px-4 py-3 text-dark text-sm">
                      {new Date(u.created_at).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <button
                        onClick={() => handleDeleteUser(u.id, u.email, t.confirmDelete)}
                        disabled={u.id === user.id}
                        className="bg-red-500 text-white px-2 xl:px-3 py-1 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs xl:text-sm whitespace-nowrap"
                        title={u.id === user.id ? t.cannotDeleteSelf : t.delete}
                      >
                        {t.delete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="px-6 py-8 text-center text-dark">
              {searchQuery ? `${t.noUserFoundFor} "${searchQuery}"` : t.noUserFound}
            </div>
          )}

          {/* Roles Legend - Compact Footer */}
          <div className="flex-shrink-0 px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 justify-center">
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{t.roles}:</span>
              {roles.map((role) => (
                <span
                  key={role.id}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium cursor-help ${
                    role.name === "super_admin"
                      ? "bg-purple-100 text-purple-800"
                      : role.name === "admin"
                      ? "bg-blue-100 text-blue-800"
                      : role.name.startsWith("professionnel")
                      ? "bg-teal/20 text-teal"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  title={role.description}
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
