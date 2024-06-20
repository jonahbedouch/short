import { routeLink } from "@/helpers";
import { permanentRedirect, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    return routeLink({ params: { slug: 'api/routes' } });
}