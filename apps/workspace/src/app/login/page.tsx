"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@crm/shared/hooks";
import { mapSupabaseUserToUser, canAccessApp } from "@crm/shared/auth";

const DEACTIVATED_MESSAGE =
  "Your account is deactivated, please contact administrator.";

function WorkspaceLoginForm() {
  const { client } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "deactivated") {
      setError(DEACTIVATED_MESSAGE);
      if (client) client.auth.signOut().catch(() => {});
    } else if (err === "superadmin_no_workspace") {
      setError("Open a workspace from the Superadmin app first.");
    }
  }, [searchParams, client]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) return;
    if (!client) {
      setError("App misconfigured: missing Supabase client");
      return;
    }
    setLoading(true);
    try {
      const { data, error: signInError } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      const user = mapSupabaseUserToUser(data.user ?? null);
      if (!user || !canAccessApp(user.role, "workspace")) {
        await client.auth.signOut();
        setError("You don't have access to this app. Workspace users only.");
        return;
      }
      // Check if workspace is disabled (workspace admin owns workspace: user_id = auth user id)
      const { data: workspace } = await client
        .from("workspaces")
        .select("disabled")
        .eq("user_id", data.user!.id)
        .single();
      if (workspace?.disabled) {
        await client.auth.signOut();
        setError(DEACTIVATED_MESSAGE);
        return;
      }
      // Full page redirect so the proxy sees session cookies on the next request
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2 text-center">Workspace login</h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Email/password only. No signup from this app.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function WorkspaceLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center p-8">
          <div className="text-gray-500">Loading…</div>
        </main>
      }
    >
      <WorkspaceLoginForm />
    </Suspense>
  );
}
