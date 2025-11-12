"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ApiUser = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  avatar?: string;
  [k: string]: any;
};

function looks_like_user(obj: any): obj is ApiUser {
  if (!obj || typeof obj !== "object") return false;
  return Boolean(
    obj.email ||
      obj.name ||
      (obj.firstName && (obj.lastName || obj.email)) ||
      obj.username
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // toast state
  const [toast, set_toast] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({ show: false, type: "info", message: "" });

  // keep refs for timers to cleanup
  const hide_toast_timer = useRef<number | null>(null);
  const redirect_timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hide_toast_timer.current) window.clearTimeout(hide_toast_timer.current);
      if (redirect_timer.current) window.clearTimeout(redirect_timer.current);
    };
  }, []);

  // Utility to safely store data in localStorage
  const safeSetLocal = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
      console.log(`[localStorage] ✅ set "${key}" →`, value);
    } catch (err) {
      console.error(`[localStorage] ❌ failed to set "${key}"`, err);
    }
  };

  const show_toast = (message: string, type: "success" | "error" | "info" = "info", autoHideMs = 2500) => {
    // clear existing timers
    if (hide_toast_timer.current) window.clearTimeout(hide_toast_timer.current);
    set_toast({ show: true, type, message });
    if (autoHideMs > 0) {
      hide_toast_timer.current = window.setTimeout(() => {
        set_toast((t) => ({ ...t, show: false }));
        hide_toast_timer.current = null;
      }, autoHideMs);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.group("[LOGIN FLOW]");
    console.log("📤 Sending login request for:", email);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email, password }),
      });

      console.log("🔁 /api/auth/login →", res.status, res.statusText);

      let json: any = null;
      try {
        json = await res.json();
        console.log("🧾 Parsed JSON response:", json);
      } catch {
        const txt = await res.text();
        console.warn("⚠️ Non-JSON response body:", txt);
      }

      if (!res.ok) {
        const msg = json?.error || json?.message || "Login failed";
        console.error("❌ Login failed:", msg);
        setError(msg);
        show_toast(String(msg), "error", 3500);
        setLoading(false);
        console.groupEnd();
        return;
      }

      // ✅ If token or user returned directly from login API
      if (json?.token) {
        safeSetLocal("authToken", json.token);
      }

      const userObj = json?.user ?? json;
      if (looks_like_user(userObj)) {
        safeSetLocal("user", JSON.stringify(userObj));
        window.dispatchEvent(new Event("auth:changed"));
        console.log("🎉 Stored user directly from login response:", userObj);

        // show success toast, then redirect shortly (keeps UX consistent)
        show_toast("Signed in — welcome back!", "success", 2000);
        setLoading(false);
        console.groupEnd();

        // short delay so user sees the toast; keeps original redirect but slightly delayed
        redirect_timer.current = window.setTimeout(() => {
          router.replace("/");
        }, 700);
        return;
      }

      // If no user info → try fetching from /api/auth/me
      console.log("📡 No user in login response → calling /api/auth/me...");
      try {
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        console.log("/api/auth/me →", meRes.status, meRes.statusText);
        let meJson: any = null;
        try {
          meJson = await meRes.json();
          console.log("📨 /api/auth/me JSON:", meJson);
        } catch {
          const txt = await meRes.text();
          console.warn("⚠️ /api/auth/me raw response:", txt);
        }

        const meUser = meJson?.user ?? meJson;
        if (looks_like_user(meUser)) {
          safeSetLocal("user", JSON.stringify(meUser));
          console.log("✅ Stored user from /api/auth/me:", meUser);
        } else {
          safeSetLocal("user", JSON.stringify({ logged: true }));
          console.warn("⚠️ /api/auth/me returned no valid user, saved {logged:true}");
        }
      } catch (meErr) {
        console.error("❌ Error calling /api/auth/me:", meErr);
        safeSetLocal("user", JSON.stringify({ logged: true }));
      }

      window.dispatchEvent(new Event("auth:changed"));
      // success toast + redirect
      show_toast("Signed in — redirecting…", "success", 1800);
      console.groupEnd();
      redirect_timer.current = window.setTimeout(() => {
        router.replace("/");
      }, 700);
    } catch (err: any) {
      console.error("🚨 Network or unexpected error:", err);
      const msg = err?.message ?? "Something went wrong. Try again.";
      setError(msg);
      show_toast(String(msg), "error", 3500);
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#160023] via-[#140018] to-[#05000a] p-6 relative">
      {/* decorative glowing blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle,#7c34ff,#3b0f5e)" }}
        />
        <div
          className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle,#00f0ff,#1c3a8a)" }}
        />
      </div>

      {/* TOAST (top-right) */}
      <div
        aria-live="polite"
        className="fixed top-6 right-6 z-[60] flex items-start"
      >
        <div
          className={`transform transition-all duration-300 ease-out origin-top-right ${
            toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-3 shadow-lg border ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500/95 to-emerald-400/95 border-green-200/10 text-white"
                : toast.type === "error"
                ? "bg-gradient-to-r from-rose-600/95 to-pink-500/95 border-rose-200/10 text-white"
                : "bg-gradient-to-r from-purple-700/95 to-indigo-600/95 border-white/10 text-white"
            }`}
            role="status"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : toast.type === "error" ? (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12A9 9 0 1112 3a9 9 0 019 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-medium text-sm">{toast.message}</div>
                {toast.type === "success" && (
                  <div className="text-xs text-white/80">Welcome back — taking you home.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-[linear-gradient(135deg,rgba(18,0,31,0.7),rgba(20,3,40,0.5))] backdrop-blur-2xl shadow-2xl rounded-2xl border border-purple-700/30 p-8 overflow-hidden">
          {/* subtle inner shadow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -40px 80px rgba(0,0,0,0.6)",
            }}
          />

          <div className="relative z-10">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white tracking-tight drop-shadow-lg">
                Elite<span className="text-[#9b7cff]">Store</span>
              </h1>
              <p className="text-sm text-purple-300/80 mt-1">
                Sign in to access your account
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-300 mb-4 bg-red-950/30 border border-red-700/40 rounded-lg py-2 px-3 text-center">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-labelledby="login-heading"
            >
              <h2 id="login-heading" className="sr-only">
                Sign in
              </h2>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Email address
                </label>
                <input
                  required
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded bg-[#17002a] border-purple-600 text-purple-400 focus:ring-purple-500"
                  />
                  <label htmlFor="remember" className="text-sm text-purple-300">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-base font-semibold rounded-lg transition-transform transform-gpu active:scale-[0.995] shadow-[0_8px_30px_rgba(124,52,255,0.12)]"
                  style={{
                    background: "linear-gradient(90deg,#8b5cf6,#06b6d4)",
                    color: "white",
                  }}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            <p className="text-sm mt-6 text-center text-purple-300/90">
              New to <span className="font-semibold text-purple-100">EliteStore</span>?{" "}
              <Link
                href="/signup"
                className="text-purple-300 hover:text-white font-medium underline decoration-purple-700/40 decoration-2 rounded-sm transition"
              >
                Create an account
              </Link>
            </p>

            <div className="mt-6 text-center text-xs text-purple-400/60">
              By continuing you agree to our{" "}
            terms  and{" "}
              Privacy
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
