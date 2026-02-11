module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/apps/shared/src/auth/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseClient",
    ()=>createSupabaseClient,
    "mapSupabaseUserToUser",
    ()=>mapSupabaseUserToUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const DEFAULT_ROLE = "customer";
function createSupabaseClient(url, anonKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
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
"[project]/apps/shared/src/auth/user.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-route] (ecmascript)");
;
async function getCurrentUser(client) {
    const { data: { user: supabaseUser }, error } = await client.auth.getUser();
    if (error || !supabaseUser) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapSupabaseUserToUser"])(supabaseUser);
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
"[project]/apps/shared/src/auth/access.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-route] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRoleAllowed"])(role, APP_ROLES[app]);
}
function getAllowedRolesForApp(app) {
    return APP_ROLES[app];
}
}),
"[project]/apps/shared/src/auth/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-route] (ecmascript)");
;
async function getSession(client) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
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
"[project]/apps/shared/src/auth/logout.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/shared/src/auth/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/apps/workspace/src/app/api/auth/set-superadmin-workspace/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-route] (ecmascript)");
;
;
;
const COOKIE_NAME = "superadmin_workspace_id";
const MAX_AGE = 60 * 60 * 24;
async function GET(request) {
    const workspaceIdParam = request.nextUrl.searchParams.get("workspace_id");
    const workspaceId = workspaceIdParam != null ? parseInt(workspaceIdParam, 10) : NaN;
    if (!Number.isInteger(workspaceId) || workspaceId < 1) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid workspace_id"
        }, {
            status: 400
        });
    }
    const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
    const anonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmltc2RoYm9oeGdubmdlamdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjIzMzQsImV4cCI6MjA4NTIzODMzNH0.RvPk-PG8DFgE-APh9J9i8NupokLk7XUcjwhqNZvKUGs");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(url, anonKey, {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options })=>response.cookies.set(name, value, options));
            }
        }
    });
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCurrentUser"])(supabase);
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRole"])(user) !== "superadmin") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    response.cookies.set(COOKIE_NAME, String(workspaceId), {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: MAX_AGE,
        path: "/"
    });
    return response;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ac1f8b4d._.js.map