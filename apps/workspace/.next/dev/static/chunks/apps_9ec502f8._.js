(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/shared/src/auth/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseClient",
    ()=>createSupabaseClient,
    "mapSupabaseUserToUser",
    ()=>mapSupabaseUserToUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const DEFAULT_ROLE = "customer";
function createSupabaseClient(url, anonKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/user.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-client] (ecmascript)");
;
async function getCurrentUser(client) {
    const { data: { user: supabaseUser }, error } = await client.auth.getUser();
    if (error || !supabaseUser) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSupabaseUserToUser"])(supabaseUser);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/access.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-client] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRoleAllowed"])(role, APP_ROLES[app]);
}
function getAllowedRolesForApp(app) {
    return APP_ROLES[app];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-client] (ecmascript)");
;
async function getSession(client) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/logout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const keysToRemove = [];
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if (key && AUTH_STORAGE_KEYS.some((prefix)=>key.startsWith(prefix))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach((key)=>localStorage.removeItem(key));
        const sessionKeysToRemove = [];
        for(let i = 0; i < sessionStorage.length; i++){
            const key = sessionStorage.key(i);
            if (key && AUTH_STORAGE_KEYS.some((prefix)=>key.startsWith(prefix))) {
                sessionKeysToRemove.push(key);
            }
        }
        sessionKeysToRemove.forEach((key)=>sessionStorage.removeItem(key));
    } catch  {
    // Ignore storage errors (e.g. private mode)
    }
}
async function performLogout(client) {
    if (client) {
        await client.auth.signOut();
    }
    clearAuthStorage();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ client, children, initialSuperadminWorkspaceId = null }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const refreshUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[refreshUser]": async ()=>{
            if (!client) return;
            const u = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
            setUser(u);
        }
    }["AuthProvider.useCallback[refreshUser]"], [
        client
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!client) {
                setIsLoading(false);
                return;
            }
            let mounted = true;
            const init = {
                "AuthProvider.useEffect.init": async ()=>{
                    const u = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
                    if (mounted) setUser(u);
                    if (mounted) setIsLoading(false);
                }
            }["AuthProvider.useEffect.init"];
            init();
            const { data: { subscription } } = client.auth.onAuthStateChange({
                "AuthProvider.useEffect": ()=>{
                    if (mounted) refreshUser();
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    mounted = false;
                    subscription.unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        client,
        refreshUser
    ]);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[signOut]": async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performLogout"])(client);
            setUser(null);
        }
    }["AuthProvider.useCallback[signOut]"], [
        client
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                user,
                role: user?.role ?? null,
                workspaceId: user?.role === "superadmin" && initialSuperadminWorkspaceId != null ? initialSuperadminWorkspaceId : user?.workspace_id ?? null,
                isLoading,
                signOut,
                client
            })
    }["AuthProvider.useMemo[value]"], [
        user,
        isLoading,
        signOut,
        client,
        initialSuperadminWorkspaceId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/shared/src/auth/AuthContext.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "x26b5ijKG8gBYZeENPltOiK9IoY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/shared/src/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/workspace/src/components/AuthWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthWrapper",
    ()=>AuthWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthWrapper({ children, initialSuperadminWorkspaceId = null }) {
    _s();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthWrapper.useMemo[client]": ()=>{
            const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
            const anonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmltc2RoYm9oeGdubmdlamdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjIzMzQsImV4cCI6MjA4NTIzODMzNH0.RvPk-PG8DFgE-APh9J9i8NupokLk7XUcjwhqNZvKUGs");
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(url, anonKey);
        }
    }["AuthWrapper.useMemo[client]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        client: client,
        initialSuperadminWorkspaceId: initialSuperadminWorkspaceId,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/workspace/src/components/AuthWrapper.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(AuthWrapper, "/KoUf8dpTovukU4B6fVhiiXXF1g=");
_c = AuthWrapper;
var _c;
__turbopack_context__.k.register(_c, "AuthWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_9ec502f8._.js.map