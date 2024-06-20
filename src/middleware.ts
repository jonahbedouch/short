import { NextRequest, NextResponse } from "next/server";

export const checkEnvironment = () => {
    return process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://l.bedouch.net';
}

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = request.cookies.get("session");

    if (!session) {
        if (request.nextUrl.pathname.startsWith('/manage/login')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/manage/login', request.url));
    }

    const apiResponse = await fetch(checkEnvironment() + '/api/login', {
        headers: {
            Cookie: `session=${session?.value}`
        }
    });

    if (apiResponse.status !== 200) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith('/manage/login') && session) {
        return NextResponse.redirect(new URL("/manage", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/manage/:path*']
}
