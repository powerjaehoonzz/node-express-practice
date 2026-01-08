const http = require("http");

const server = http.createServer();
server.listen(8080);
server.on("listening", () => {
  console.log("listen on 8080!!!");
});

server.on("request", (req, res) => {
  const { headers, method, url } = req;
  const userAgent = headers["user-agent"];
  let body = [];
  req
    .on("error", (err) => {
      console.log(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(body);
    });

  res.write("<h1>Node Server</h1>");
  res.end();
});
