// super-simple-static-server only for text files

Deno.serve(
  { port: 8033, hostname: "127.0.0.1" },
  async (request: Request) => {
    const { pathname } = new URL(request.url);

    const filename = pathname === "/"
      ? "index.html"
      : pathname.replace("/", "");
    console.log({ pathname, filename });

    const ext = filename.match(/\.(\w+)$/)?.at(1) || "";
    const contentType = {
      html: "text/html",
      css: "text/css",
      js: "text/javascript",
      svg: "image/svg+xml",
    }[ext] || "text/plain";

    const src = await Deno.readTextFile(filename);
    return new Response(src, { headers: { "content-type": contentType } });
  },
);
