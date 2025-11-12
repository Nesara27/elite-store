// app/signup/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // toast state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        setError(json?.error || text || "Signup failed");
        setLoading(false);
        return;
      }

      // show success toast then redirect (keeps original functionality)
      setToast({ show: true, message: "Account created" });
      // hide toast after 2.5s and redirect shortly after
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
      setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      console.error("Signup error", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // small accessibility: clear any leftover error when user edits form
  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(id);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#160023] via-[#140018] to-[#05000a] p-6 relative">
      {/* ambient glow blobs */}
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

      {/* Toast (top-right) */}
      <div
        aria-live="polite"
        className="fixed top-6 right-6 z-[60] flex items-start"
      >
        <div
          className={`transform transition-all duration-300 ease-out origin-top-right ${
            toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <div className="rounded-lg bg-gradient-to-r from-purple-700/95 to-indigo-600/95 text-white px-4 py-3 shadow-lg border border-white/10">
            <div className="font-medium text-sm">{toast.message}</div>
            <div className="text-xs text-purple-200/80">You're good to go — redirecting…</div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-[linear-gradient(135deg,rgba(18,0,31,0.7),rgba(20,3,40,0.5))] backdrop-blur-2xl shadow-2xl rounded-2xl border border-purple-700/30 p-8 overflow-hidden relative">
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
              <p className="text-purple-300/80 text-sm mt-1">Create your account</p>
            </div>

            {error && (
              <div className="text-sm text-red-300 mb-4 bg-red-950/30 border border-red-700/40 rounded-lg py-2 px-3 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  First name
                </label>
                <input
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Last name
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                >
                  <option className="text-black" value="">
                    Prefer not to say
                  </option>
                  <option className="text-black" value="male">
                    Male
                  </option>
                  <option className="text-black" value="female">
                    Female
                  </option>
                  <option className="text-black" value="other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1 text-purple-200">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f0420]/50 border border-purple-700/40 text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 outline-none transition duration-200 shadow-sm"
                  placeholder="Create a password"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-base font-semibold rounded-lg transition-transform transform-gpu active:scale-[0.995] shadow-[0_8px_30px_rgba(124,52,255,0.12)]"
                  style={{
                    background: "linear-gradient(90deg,#8b5cf6,#06b6d4)",
                    color: "white",
                  }}
                >
                  {loading ? "Creating..." : "Create account"}
                </Button>
              </div>
            </form>

            <p className="text-sm mt-6 text-center text-purple-300/90">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-300 hover:text-white font-medium underline decoration-purple-700/40 decoration-2 rounded-sm transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
