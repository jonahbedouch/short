import { initAdmin } from "@/firebaseAdmin";
import { routeLink } from "@/helpers";
import { getAuth } from "firebase-admin/auth";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return routeLink({ params: { slug: 'api/accounts/delete' } })
}

export async function POST(request: NextRequest) {
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
    permanentRedirect(process.env.DEFAULT_LINK ?? '');
  }

  const editMsg: { editors: Array<string> } = JSON.parse(data.files[process.env.EDITORS_FILE_NAME].content);
  if ('editors' in editMsg === false || !Array.isArray(editMsg.editors)) {
    permanentRedirect(process.env.DEFAULT_LINK ?? '');
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

  const req = await request.json();
  const email = String(req.email);

  if (email == "" || email === null || editMsg.editors.includes(email) === false) {
    redirect("/manage")
  }

  editMsg.editors.splice(editMsg.editors.indexOf(email), 1);

  const post = await fetch(`https://api.github.com/gists/${process.env.SHORTLINK_GIST_ID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_SECRET}`
    },
    method: 'post',
    body: JSON.stringify({
      files: {
        [process.env.EDITORS_FILE_NAME]: {
          content: JSON.stringify(editMsg)
        }
      }
    })
  })

  revalidateTag('editors');
  return redirect('/manage');
}