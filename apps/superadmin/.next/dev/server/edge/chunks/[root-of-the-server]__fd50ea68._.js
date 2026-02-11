(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__fd50ea68._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/apps/shared/src/auth/client.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseClient",
    ()=>createSupabaseClient,
    "mapSupabaseUserToUser",
    ()=>mapSupabaseUserToUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
;
const DEFAULT_ROLE = "customer";
function createSupabaseClient(url, anonKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
}
function mapSupabaseUserToUser(supabaseUser) {
    if (!supabaseUser) return null;
    const meta = supabaseUser.user_metadata ?? {};
    const role = meta.role ?? DEFAULT_ROLE;
    const workspace_id = typeof meta.workspace_id === "number" ? meta.workspace_id : null;
    const name = meta.full_name ?? meta.name ?? supabaseUser.email?.split("@")[0] ?? null;
    return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        name,
        role,
        workspace_id
    };
}
}),
"[project]/apps/shared/src/auth/user.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getRole",
    ()=>getRole,
    "getWorkspaceId",
    ()=>getWorkspaceId,
    "isRoleAllowed",
    ()=>isRoleAllowed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [middleware-edge] (ecmascript)");
;
async function getCurrentUser(client) {
    const { data: { user: supabaseUser }, error } = await client.auth.getUser();
    if (error || !supabaseUser) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapSupabaseUserToUser"])(supabaseUser);
}
function getRole(user) {
    return user.role;
}
function getWorkspaceId(user) {
    return user.workspace_id;
}
function isRoleAllowed(role, allowedRoles) {
    return allowedRoles.includes(role);
}
}),
"[project]/apps/shared/src/auth/access.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUPERADMIN_APP_ROLES",
    ()=>SUPERADMIN_APP_ROLES,
    "WORKSPACE_APP_ROLES",
    ()=>WORKSPACE_APP_ROLES,
    "canAccessApp",
    ()=>canAccessApp,
    "getAllowedRolesForApp",
    ()=>getAllowedRolesForApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [middleware-edge] (ecmascript)");
;
const SUPERADMIN_APP_ROLES = [
    "superadmin"
];
const WORKSPACE_APP_ROLES = [
    "superadmin",
    "workspace_admin",
    "customer"
];
const APP_ROLES = {
    superadmin: SUPERADMIN_APP_ROLES,
    workspace: WORKSPACE_APP_ROLES
};
function canAccessApp(role, app) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isRoleAllowed"])(role, APP_ROLES[app]);
}
function getAllowedRolesForApp(app) {
    return APP_ROLES[app];
}
}),
"[project]/apps/shared/src/auth/session.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [middleware-edge] (ecmascript)");
;
async function getSession(client) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
    if (!user) return null;
    const { data: { session: supabaseSession } } = await client.auth.getSession();
    const expiresAt = supabaseSession?.expires_at ? supabaseSession.expires_at * 1000 : 0;
    return {
        user,
        expiresAt
    };
}
async function signOut(client) {
    await client.auth.signOut();
}
}),
"[project]/apps/shared/src/auth/logout.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "performLogout",
    ()=>performLogout
]);
/** Keys that may hold auth/session data in storage (clear on logout). */ const AUTH_STORAGE_KEYS = [
    "sb-"
];
/**
 * Clear any cached auth-related data from localStorage/sessionStorage.
 * Supabase signOut() clears its own keys; this clears any app-specific or residual keys.
 */ function clearAuthStorage() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
async function performLogout(client) {
    if (client) {
        await client.auth.signOut();
    }
    clearAuthStorage();
}
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/shared/src/auth/index.ts [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$session$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/session.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [middleware-edge] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/apps/superadmin/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/index.ts [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [middleware-edge] (ecmascript)");
;
;
;
const LOGIN_PATH = "/login";
async function middleware(request) {
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
    const anonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmltc2RoYm9oeGdubmdlamdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjIzMzQsImV4cCI6MjA4NTIzODMzNH0.RvPk-PG8DFgE-APh9J9i8NupokLk7XUcjwhqNZvKUGs");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(url, anonKey, {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options })=>response.cookies.set(name, value, options));
            }
        }
    });
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCurrentUser"])(supabase);
    const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;
    if (!user) {
        if (isLoginPage) return response;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(LOGIN_PATH, request.url));
    }
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRole"])(user);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["canAccessApp"])(role, "superadmin")) {
        if (isLoginPage) return response;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(LOGIN_PATH, request.url));
    }
    if (isLoginPage) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", request.url));
    }
    return response;
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__fd50ea68._.js.map