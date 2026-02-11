module.exports = [
"[project]/apps/shared/src/auth/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseClient",
    ()=>createSupabaseClient,
    "mapSupabaseUserToUser",
    ()=>mapSupabaseUserToUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
const DEFAULT_ROLE = "customer";
function createSupabaseClient(url, anonKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, anonKey);
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
"[project]/apps/shared/src/auth/user.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-rsc] (ecmascript)");
;
async function getCurrentUser(client) {
    const { data: { user: supabaseUser }, error } = await client.auth.getUser();
    if (error || !supabaseUser) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapSupabaseUserToUser"])(supabaseUser);
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
"[project]/apps/shared/src/auth/access.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-rsc] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRoleAllowed"])(role, APP_ROLES[app]);
}
function getAllowedRolesForApp(app) {
    return APP_ROLES[app];
}
}),
"[project]/apps/shared/src/auth/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-rsc] (ecmascript)");
;
async function getSession(client) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
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
"[project]/apps/shared/src/auth/logout.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx <module evaluation>", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "AuthProvider");
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/shared/src/auth/AuthContext.tsx", "useAuth");
}),
"[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/shared/src/auth/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$access$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/access.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$logout$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/logout.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$AuthContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/AuthContext.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/apps/superadmin/src/lib/supabase-server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseServerClient",
    ()=>createSupabaseServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createSupabaseServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
    const anonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmltc2RoYm9oeGdubmdlamdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjIzMzQsImV4cCI6MjA4NTIzODMzNH0.RvPk-PG8DFgE-APh9J9i8NupokLk7XUcjwhqNZvKUGs");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(url, anonKey, {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // Ignore if called from Server Component read context
                }
            }
        }
    });
}
}),
"[project]/apps/superadmin/src/lib/supabase-admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseAdminClient",
    ()=>createSupabaseAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
function createSupabaseAdminClient() {
    const url = ("TURBOPACK compile-time value", "https://vmfimsdhbohxgnngejgg.supabase.co");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/apps/superadmin/src/lib/email.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendWorkspaceCreatedEmail",
    ()=>sendWorkspaceCreatedEmail,
    "sendWorkspaceDisabledEmail",
    ()=>sendWorkspaceDisabledEmail,
    "sendWorkspaceEnabledEmail",
    ()=>sendWorkspaceEnabledEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)");
;
let transporter = null;
function getTransporter() {
    if (transporter) return transporter;
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return null;
    transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
        host,
        port: port ? parseInt(port, 10) : 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user,
            pass
        }
    });
    return transporter;
}
const DEFAULT_FROM = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "noreply@getsettime.com";
async function sendWorkspaceCreatedEmail(to, workspaceName) {
    const trans = getTransporter();
    if (!trans) return;
    const subject = `Your workspace "${workspaceName}" is ready`;
    const text = `Your new workspace "${workspaceName}" has been created. You can now log in to the workspace app with the credentials you received.`;
    const html = `
    <p>Your new workspace <strong>${escapeHtml(workspaceName)}</strong> has been created.</p>
    <p>You can now log in to the workspace app with the credentials you used during setup.</p>
    <p>If you have any questions, please contact your administrator.</p>
  `.trim();
    try {
        await trans.sendMail({
            from: DEFAULT_FROM,
            to,
            subject,
            text,
            html
        });
    } catch (err) {
        console.error("[email] sendWorkspaceCreatedEmail failed:", err);
    }
}
async function sendWorkspaceDisabledEmail(to, workspaceName) {
    const trans = getTransporter();
    if (!trans) return;
    const subject = `Your workspace "${workspaceName}" has been disabled`;
    const text = `Your workspace "${workspaceName}" has been disabled by an administrator. You will not be able to log in to the workspace app until it is enabled again. Please contact your administrator if you have questions.`;
    const html = `
    <p>Your workspace <strong>${escapeHtml(workspaceName)}</strong> has been disabled by an administrator.</p>
    <p>You will not be able to log in to the workspace app until it is enabled again.</p>
    <p>Please contact your administrator if you have questions.</p>
  `.trim();
    try {
        await trans.sendMail({
            from: DEFAULT_FROM,
            to,
            subject,
            text,
            html
        });
    } catch (err) {
        console.error("[email] sendWorkspaceDisabledEmail failed:", err);
    }
}
async function sendWorkspaceEnabledEmail(to, workspaceName) {
    const trans = getTransporter();
    if (!trans) return;
    const subject = `Your workspace "${workspaceName}" has been enabled`;
    const text = `Your workspace "${workspaceName}" has been enabled. You can now log in to the workspace app again.`;
    const html = `
    <p>Your workspace <strong>${escapeHtml(workspaceName)}</strong> has been enabled.</p>
    <p>You can now log in to the workspace app again.</p>
  `.trim();
    try {
        await trans.sendMail({
            from: DEFAULT_FROM,
            to,
            subject,
            text,
            html
        });
    } catch (err) {
        console.error("[email] sendWorkspaceEnabledEmail failed:", err);
    }
}
function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
}),
"[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00237b55da3a452e30a22afcf3f53247b831693c5f":"listWorkspaces","005882ea55dfe9fa8b8447bbe24266854295403d83":"getDashboardCounts","405e5901a59a87bb21bf2c8f5fdf985fed164d0435":"getWorkspaceLoginLink","406de05990fa881d7fa093859c728b4aee03943cb6":"deleteWorkspace","40724e048fcd24b9503b760acdff1cc42a0653a4b5":"createWorkspace","60384f9d9c6054fd2a32f2fab819e6c7626135e693":"notifyWorkspaceCreated","6077087eb31cf8dfd3ee7afa5bf105060ac5ffb5cd":"updateWorkspaceDisabled","70441733904e3aab3459f6a777955cfb92b70a6575":"createWorkspaceAdminUser"},"",""] */ __turbopack_context__.s([
    "createWorkspace",
    ()=>createWorkspace,
    "createWorkspaceAdminUser",
    ()=>createWorkspaceAdminUser,
    "deleteWorkspace",
    ()=>deleteWorkspace,
    "getDashboardCounts",
    ()=>getDashboardCounts,
    "getWorkspaceLoginLink",
    ()=>getWorkspaceLoginLink,
    "listWorkspaces",
    ()=>listWorkspaces,
    "notifyWorkspaceCreated",
    ()=>notifyWorkspaceCreated,
    "updateWorkspaceDisabled",
    ()=>updateWorkspaceDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/shared/src/auth/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/superadmin/src/lib/supabase-server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/superadmin/src/lib/supabase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/superadmin/src/lib/email.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const SUPERADMIN_ONLY = "Only superadmin can perform this action.";
async function requireSuperadmin() {
    const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServerClient"])();
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])(client);
    if (!user) throw new Error("Unauthorized");
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$shared$2f$src$2f$auth$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRole"])(user) !== "superadmin") throw new Error(SUPERADMIN_ONLY);
    return user;
}
async function getDashboardCounts() {
    await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const [workspacesRes, leadsRes] = await Promise.all([
        admin.from("workspaces").select("*", {
            count: "exact",
            head: true
        }),
        admin.from("leads").select("*", {
            count: "exact",
            head: true
        })
    ]);
    return {
        workspacesCount: workspacesRes.count ?? 0,
        leadsCount: leadsRes.count ?? 0
    };
}
async function listWorkspaces() {
    await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data, error } = await admin.from("workspaces").select("id, name, user_id, disabled, created_at").order("created_at", {
        ascending: false
    });
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    const withEmailsAndCounts = await Promise.all(rows.map(async (w)=>{
        let owner_email = null;
        if (w.user_id?.trim()) {
            const { data: userData } = await admin.auth.admin.getUserById(w.user_id);
            owner_email = userData?.user?.email ?? null;
        }
        const { count } = await admin.from("leads").select("*", {
            count: "exact",
            head: true
        }).eq("workspace_id", w.id);
        const leads_count = count ?? 0;
        return {
            ...w,
            owner_email,
            leads_count
        };
    }));
    return withEmailsAndCounts;
}
async function createWorkspace(name) {
    const user = await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data, error } = await admin.from("workspaces").insert({
        name,
        user_id: user.id
    }).select("id, name, user_id, disabled, created_at").single();
    if (error) throw new Error(error.message);
    return data;
}
async function createWorkspaceAdminUser(workspaceId, email, password) {
    await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            role: "workspace_admin",
            workspace_id: workspaceId
        }
    });
    if (createError) throw new Error(createError.message);
    if (!newUser.user) throw new Error("User creation failed");
    const { error: updateError } = await admin.from("workspaces").update({
        user_id: newUser.user.id
    }).eq("id", workspaceId);
    if (updateError) throw new Error(updateError.message);
}
async function updateWorkspaceDisabled(workspaceId, disabled) {
    await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { error } = await admin.from("workspaces").update({
        disabled
    }).eq("id", workspaceId);
    if (error) throw new Error(error.message);
    const { data: workspace } = await admin.from("workspaces").select("name, user_id").eq("id", workspaceId).single();
    if (workspace?.user_id) {
        const { data: userData } = await admin.auth.admin.getUserById(workspace.user_id);
        const ownerEmail = userData?.user?.email;
        if (ownerEmail && workspace.name) {
            if (disabled) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWorkspaceDisabledEmail"])(ownerEmail, workspace.name);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWorkspaceEnabledEmail"])(ownerEmail, workspace.name);
            }
        }
    }
}
async function notifyWorkspaceCreated(workspaceName, adminEmail) {
    await requireSuperadmin();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendWorkspaceCreatedEmail"])(adminEmail, workspaceName);
}
async function deleteWorkspace(workspaceId) {
    await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { error } = await admin.from("workspaces").delete().eq("id", workspaceId);
    if (error) throw new Error(error.message);
}
const WORKSPACE_APP_URL = ("TURBOPACK compile-time value", "http://localhost:3003") ?? "http://localhost:3002";
async function getWorkspaceLoginLink(workspaceId) {
    const user = await requireSuperadmin();
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const redirectTo = `${WORKSPACE_APP_URL.replace(/\/$/, "")}/auth/enter?workspace_id=${workspaceId}`;
    const { data, error } = await admin.auth.admin.generateLink({
        type: "magiclink",
        email: user.email,
        options: {
            redirectTo
        }
    });
    if (error) throw new Error(error.message);
    const link = data?.properties?.action_link;
    if (!link) throw new Error("Failed to generate link");
    return {
        url: link
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getDashboardCounts,
    listWorkspaces,
    createWorkspace,
    createWorkspaceAdminUser,
    updateWorkspaceDisabled,
    notifyWorkspaceCreated,
    deleteWorkspace,
    getWorkspaceLoginLink
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDashboardCounts, "005882ea55dfe9fa8b8447bbe24266854295403d83", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listWorkspaces, "00237b55da3a452e30a22afcf3f53247b831693c5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createWorkspace, "40724e048fcd24b9503b760acdff1cc42a0653a4b5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createWorkspaceAdminUser, "70441733904e3aab3459f6a777955cfb92b70a6575", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateWorkspaceDisabled, "6077087eb31cf8dfd3ee7afa5bf105060ac5ffb5cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(notifyWorkspaceCreated, "60384f9d9c6054fd2a32f2fab819e6c7626135e693", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteWorkspace, "406de05990fa881d7fa093859c728b4aee03943cb6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getWorkspaceLoginLink, "405e5901a59a87bb21bf2c8f5fdf985fed164d0435", null);
}),
"[project]/apps/superadmin/.next-internal/server/app/(dashboard)/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/apps/superadmin/.next-internal/server/app/(dashboard)/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00237b55da3a452e30a22afcf3f53247b831693c5f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listWorkspaces"],
    "005882ea55dfe9fa8b8447bbe24266854295403d83",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardCounts"],
    "405e5901a59a87bb21bf2c8f5fdf985fed164d0435",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWorkspaceLoginLink"],
    "406de05990fa881d7fa093859c728b4aee03943cb6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteWorkspace"],
    "40724e048fcd24b9503b760acdff1cc42a0653a4b5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWorkspace"],
    "60384f9d9c6054fd2a32f2fab819e6c7626135e693",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notifyWorkspaceCreated"],
    "6077087eb31cf8dfd3ee7afa5bf105060ac5ffb5cd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateWorkspaceDisabled"],
    "70441733904e3aab3459f6a777955cfb92b70a6575",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWorkspaceAdminUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/superadmin/.next-internal/server/app/(dashboard)/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$superadmin$2f$src$2f$app$2f$actions$2f$workspaces$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/superadmin/src/app/actions/workspaces.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d06923e._.js.map