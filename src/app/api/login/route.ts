import { initAdmin } from "@/firebaseAdmin";
import { app, auth } from "firebase-admin";
import { getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies, headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  initAdmin();

  const session = request.cookies.get('session');
  if (session === undefined) {
    return NextResponse.json({}, { status: 401 })
  }

  const res = await fetch(`https://api.github.com/gists/${process.env.SHORTLINK_GIST_ID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_SECRET}`
    },
    next: { tags: ['routes'] },
    cache: "force-cache",
  })
  const data = await res.json();

  if (!(process.env.EDITORS_FILE_NAME != undefined && 'files' in data && process.env.EDITORS_FILE_NAME in data.files && 'content' in data.files[process.env.EDITORS_FILE_NAME] && typeof data.files[process.env.EDITORS_FILE_NAME].content == 'string')) {
    return NextResponse.json({}, { status: 500 })
  }

  const editMsg: { editors: Array<string> } = JSON.parse(data.files[process.env.EDITORS_FILE_NAME].content);
  if ('editors' in editMsg === false || !Array.isArray(editMsg.editors)) {
    return NextResponse.json({}, { status: 500 })
  }

  try {
    let decodedToken = await getAuth().verifySessionCookie(session.value);
    if (decodedToken.email == undefined || !editMsg.editors.includes(decodedToken.email)) {
      return NextResponse.json({}, { status: 403 });
    }
  } catch {
    cookies().delete("session");
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  initAdmin();

  const res = await fetch(`https://api.github.com/gists/${process.env.SHORTLINK_GIST_ID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_SECRET}`
    },
    next: { tags: ['routes'] },
    cache: "force-cache",
  })
  const data = await res.json();

  if (!(process.env.EDITORS_FILE_NAME != undefined && 'files' in data && process.env.EDITORS_FILE_NAME in data.files && 'content' in data.files[process.env.EDITORS_FILE_NAME] && typeof data.files[process.env.EDITORS_FILE_NAME].content == 'string')) {
    return NextResponse.json({}, { status: 500 })
  }

  const editMsg: { editors: Array<string> } = JSON.parse(data.files[process.env.EDITORS_FILE_NAME].content);
  if ('editors' in editMsg === false || !Array.isArray(editMsg.editors)) {
    return NextResponse.json({}, { status: 500 })
  }

  const authHeader = headers().get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await getAuth().verifyIdToken(token);

    if (decoded && decoded.email && editMsg.editors.includes(decoded.email)) {
      // Generate session cookie (expires in 5 days)
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn / 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      };

      //Add the cookie to the browser
      cookies().set(options);
      return NextResponse.json({}, { status: 200 });
    }
    return NextResponse.json({}, { status: 403 });
  }
  return NextResponse.json({}, { status: 401 });
}