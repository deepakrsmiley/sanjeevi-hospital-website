import { useState } from "react";
import { useLocation } from "wouter";
import { loginAdmin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(username, password);
    if (ok) {
      setLocation("/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  const field = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]/30";
  const label = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border border-[#6A1B9A]/10">
        <h1 className="text-2xl font-bold text-[#6A1B9A] mb-1 text-center">Admin Login</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Sri Sanjeevi Hospital Admin Panel</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={label}>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={field}
              autoFocus
            />
          </div>
          <div>
            <label className={label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={field}
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#E91E63] text-white font-bold hover:opacity-90 transition-opacity"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}