"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Terminal, ShieldAlert, Lock, User, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/ui/logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Terminal telemetry logs simulation
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      "sys_init: connecting to auth_service_v4.1...",
      "security: checking local keys... verified.",
      "security: TLS handshake completed successfully.",
      "system: enter credentials below."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setLogs((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Credentials required.");
      return;
    }

    setLoading(true);
    setError("");
    setLogs((prev) => [...prev, `auth: authenticating user '${username}'...`]);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLogs((prev) => [...prev, "auth: success. establishing secure session...", "redirecting..."]);
        setTimeout(() => {
          router.push(from);
          router.refresh();
        }, 800);
      } else {
        setError(data.error || "Authentication failed.");
        setLogs((prev) => [...prev, "auth: failed. invalid credentials block."]);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Network or server error.");
      setLogs((prev) => [...prev, "auth: failed. connection timed out."]);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md border border-cyber-border rounded-xl bg-[#050505]/95 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Terminal Header */}
      <div className="flex justify-between items-center bg-[#0d1214] px-4 py-3 border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-terminal-green" />
          <span className="text-xs font-bold text-gray-400 tracking-wider">SECURE_AUTH_GATEWAY // v1.0.0</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6">
        <div className="mb-6 space-y-1 text-[11px] text-gray-500 border-b border-cyber-border/40 pb-4 h-24 overflow-y-auto">
          {logs.map((log, idx) => {
            if (!log) return null;
            const isFailed = log.includes("failed");
            const isSuccess = log.includes("success");
            return (
              <p key={idx} className={isFailed ? "text-red-400" : isSuccess ? "text-terminal-green" : ""}>
                &gt; {log}
              </p>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <User className="h-4 w-4" />
              </span>
              <input
                id="username"
                type="text"
                required
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#030303] border border-cyber-border hover:border-cyber-border/80 focus:border-terminal-green focus:ring-1 focus:ring-terminal-green text-gray-200 placeholder-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-sm font-mono transition-all outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#030303] border border-cyber-border hover:border-cyber-border/80 focus:border-terminal-green focus:ring-1 focus:ring-terminal-green text-gray-200 placeholder-gray-600 rounded-lg py-2.5 pl-10 pr-12 text-sm font-mono transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 text-red-400 p-3 rounded-lg text-xs">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-transparent border border-terminal-green text-terminal-green font-bold py-3 px-4 rounded-lg hover:bg-terminal-green hover:text-black hover:shadow-cyber-glow-green cursor-pointer transition-all duration-300 font-mono text-xs disabled:opacity-50"
          >
            {loading ? "&gt; CONNECTING..." : "&gt; INITIALIZE_SESSION"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background neon grid decoration */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-green/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-teal/5 blur-[120px] rounded-full -z-10" />

      {/* Logo */}
      <div className="mb-8 w-48 md:w-56">
        <Logo variant="full" />
      </div>

      <Suspense fallback={
        <div className="w-full max-w-md border border-cyber-border rounded-xl bg-[#050505]/95 p-8 text-center text-xs text-gray-500">
          &gt; INITIALIZING_SECURE_AUTH_GATEWAY...
        </div>
      }>
        <LoginForm />
      </Suspense>

      {/* Footer warning */}
      <p className="mt-8 text-[10px] text-gray-600 tracking-wider uppercase text-center max-w-xs leading-relaxed">
        [!] Unauthorized access attempts are monitored and recorded. All activities logged by secure firewalls.
      </p>
    </main>
  );
}
