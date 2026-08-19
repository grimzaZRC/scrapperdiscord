const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const indexPath = path.join(__dirname, "public", "index.html");

const server = http.createServer(async (request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (request.url !== "/") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const page = await readFile(indexPath);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8"
    });
    response.end(page);
  } catch (error) {
    console.error("Unable to render the application", error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Unable to render the application");
  }
});

server.listen(port, host, () => {
  console.log(`scrapperdiscord listening on http://${host}:${port}`);
});
