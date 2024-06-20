import { permanentRedirect } from "next/navigation";

export async function routeLink({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.github.com/gists/${process.env.SHORTLINK_GIST_ID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_SECRET}`
    },
    next: { tags: ['routes'] },
    cache: "force-cache",
  })
  const data = await res.json();

  if (!(process.env.REDIRECT_FILE_NAME != undefined && 'files' in data && process.env.REDIRECT_FILE_NAME in data.files && 'content' in data.files[process.env.REDIRECT_FILE_NAME] && typeof data.files[process.env.REDIRECT_FILE_NAME].content == 'string')) {
    permanentRedirect(process.env.DEFAULT_LINK ?? '');
  }

  const message = JSON.parse(data.files[process.env.REDIRECT_FILE_NAME].content);

  if (params.slug in message) {
    permanentRedirect(message[params.slug]);
  }
  else {
    permanentRedirect(process.env.DEFAULT_LINK ?? '');
  }
}