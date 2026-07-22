import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authIsConfigured, isAuthorized } from "@/lib/server/auth";
export default function proxy(request: NextRequest) { if (!authIsConfigured()) return new NextResponse("RingFlow authentication is not configured.", { status: 503 }); if (!isAuthorized(request)) return new NextResponse("Authentication required.", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="RingFlow", charset="UTF-8"' } }); return NextResponse.next(); }
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };

