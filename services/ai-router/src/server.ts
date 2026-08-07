import http from "http";

const server = http.createServer(async (req, res) => {

  if (req.method === "POST" && req.url === "/chat") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {

      const { prompt } = JSON.parse(body);

      res.writeHead(200, {
        "Content-Type":"application/json"
      });

      res.end(JSON.stringify({
        provider:"router",
        model:"none",
        message:"Received: " + prompt
      }));

    });

    return;
  }

  res.writeHead(404);
  res.end();

});

server.listen(3001, () => {
  console.log("AI Router :3001");
});
