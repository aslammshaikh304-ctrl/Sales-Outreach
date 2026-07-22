import { NextResponse } from "next/server";

function safeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  return mismatch === 0;
}
function credentials() { const username = process.env.RINGFLOW_BASIC_AUTH_USERNAME; const password = process.env.RINGFLOW_BASIC_AUTH_PASSWORD; return username && password ? { username, password } : null; }
export function authIsConfigured() { return credentials() !== null; }
export function isAuthorized(request: Request) {
  const expected = credentials(); const authorization = request.headers.get("authorization");
  if (!expected || !authorization?.startsWith("Basic ")) return false;
  try { const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8"); const separator = decoded.indexOf(":"); return separator >= 0 && safeEqual(decoded.slice(0, separator), expected.username) && safeEqual(decoded.slice(separator + 1), expected.password); } catch { return false; }
}
export function unauthorized() { return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401, headers: { "WWW-Authenticate": 'Basic realm="RingFlow", charset="UTF-8"' } }); }

