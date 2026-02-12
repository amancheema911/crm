import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getCurrentUser, getRole, canAccessApp } from "@crm/shared/auth";
import type { AppRole } from "@crm/shared/auth";

const LOGIN_PATH = "/login";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const user = await getCurrentUser(supabase);
  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;

  if (!user) {
    if (isLoginPage) return response;
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const role = getRole(user);
  if (!canAccessApp(role, "superadmin")) {
    if (isLoginPage) return response;
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
