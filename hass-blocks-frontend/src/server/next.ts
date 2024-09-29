import { createServer } from "http";
import { parse } from "url";
import next from "next";

export const startNextServer = async () => {
  const port = 3000;
  const host = "0.0.0.0";
  const dev = process.env.NODE_ENV !== "production";

  const app = next({ dev });

  const handle = app.getRequestHandler();

  await app.prepare();

  createServer((request, response) => {
    const parsedUrl = parse(request.url!, true);

    handle(request, response, parsedUrl);
  }).listen(port, host);

  console.log(
    `> Server listening at http://${host}:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
};
