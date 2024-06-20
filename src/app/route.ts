import { routeLink } from "@/helpers";
import { permanentRedirect, redirect } from "next/navigation";

export const revalidate = false;
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  permanentRedirect(process.env.DEFAULT_LINK ?? '')
}