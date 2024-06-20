import AddEditor from "@/components/AddEditor";
import AddRoute from "@/components/AddRoute";
import EditorTable from "@/components/EditorTable/EditorTable";
import RouteTable from "@/components/RouteTable/RouteTable";
import Image from "next/image";

export default async function Home() {
  const res = await fetch(`https://api.github.com/gists/${process.env.SHORTLINK_GIST_ID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_SECRET}`
    },
    next: { tags: ['routes', 'editors'] },
    cache: "force-cache",
  })
  const data = await res.json();

  if (!(process.env.REDIRECT_FILE_NAME != undefined && process.env.EDITORS_FILE_NAME != undefined && 'files' in data && process.env.REDIRECT_FILE_NAME in data.files &&
    'content' in data.files[process.env.REDIRECT_FILE_NAME] && typeof data.files[process.env.REDIRECT_FILE_NAME].content == 'string' &&
    'content' in data.files[process.env.EDITORS_FILE_NAME] && typeof data.files[process.env.EDITORS_FILE_NAME].content == 'string')) {
    return (
      <main>
        404, your config or data is malformed.
      </main>
    );
  }

  const redirects: { [arg0: string]: string } = JSON.parse(data.files[process.env.REDIRECT_FILE_NAME].content);
  const editorReq: { [arg0: string]: string[] | undefined } = JSON.parse(data.files[process.env.EDITORS_FILE_NAME].content);

  return (
    <main className="flex min-h-screen flex-col items-center max-w-screen-2xl lg:px-24 px-2 py-4 mx-auto">
      <h1 className="text-lg font-bold text-center">Editors</h1>
      <AddEditor />
      <EditorTable editors={editorReq.editors ?? []} />
      <h1 className="mt-8 text-lg font-bold text-center">Routes</h1>
      <AddRoute />
      <RouteTable redirects={redirects} />
    </main>
  );
}
