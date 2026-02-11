module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/shared/src/auth/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseClient",
    ()=>createSupabaseClient,
    "mapSupabaseUserToUser",
    ()=>mapSupabaseUserToUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const DEFAULT_ROLE = "customer";
function createSupabaseClient(url, anonKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
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
"[project]/apps/shared/src/auth/user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-ssr] (ecmascript)");
;
async function getCurrentUser(client) {
    const { data: { user: supabaseUser }, error } = await client.auth.getUser();
    if (error || !supabaseUser) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapSupabaseUserToUser"])(supabaseUser);
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
"[project]/apps/shared/src/auth/access.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-ssr] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRoleAllowed"])(role, APP_ROLES[app]);
}
function getAllowedRolesForApp(app) {
    return APP_ROLES[app];
}
}),
"[project]/apps/shared/src/auth/session.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-ssr] (ecmascript)");
;
async function getSession(client) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
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
"[project]/apps/shared/src/auth/logout.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/shared/src/auth/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ client, children, initialSuperadminWorkspaceId = null }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!client) return;
        const u = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
        setUser(u);
    }, [
        client
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!client) {
            setIsLoading(false);
            return;
        }
        let mounted = true;
        const init = async ()=>{
            const u = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
            if (mounted) setUser(u);
            if (mounted) setIsLoading(false);
        };
        init();
        const { data: { subscription } } = client.auth.onAuthStateChange(()=>{
            if (mounted) refreshUser();
        });
        return ()=>{
            mounted = false;
            subscription.unsubscribe();
        };
    }, [
        client,
        refreshUser
    ]);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performLogout"])(client);
        setUser(null);
    }, [
        client
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            user,
            role: user?.role ?? null,
            workspaceId: user?.role === "superadmin" && initialSuperadminWorkspaceId != null ? initialSuperadminWorkspaceId : user?.workspace_id ?? null,
            isLoading,
            signOut,
            client
        }), [
        user,
        isLoading,
        signOut,
        client,
        initialSuperadminWorkspaceId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/shared/src/auth/AuthContext.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
}),
"[project]/apps/shared/src/auth/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/apps/superadmin/src/components/AuthWrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthWrapper",
    ()=>AuthWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AuthWrapper({ children }) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
        const anonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmltc2RoYm9oeGdubmdlamdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjIzMzQsImV4cCI6MjA4NTIzODMzNH0.RvPk-PG8DFgE-APh9J9i8NupokLk7XUcjwhqNZvKUGs");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(url, anonKey);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        client: client,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/superadmin/src/components/AuthWrapper.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__124b9335._.js.map