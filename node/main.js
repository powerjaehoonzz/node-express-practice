var http = require("http");
var fs = require("fs");
var url = require("url");

const templateHTML = (title, list, body) => {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
  </body>
  </html>
  `;
};

const templateList = (fileList) => {
  var list = "<ul>";
  var i = 0;
  while (i < fileList.length) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    i++;
  }
  list += "</ul>";
  return list;
};

var app = http.createServer(function (req, res) {
  var _url = req.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("../data", (err, fileList) => {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = templateList(fileList);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`
        );
        res.writeHead(200);
        res.end(template);
      });
    } else {
      fs.readdir("../data", (err, fileList) => {
        console.log(fileList);
        fs.readFile(`../data/${queryData.id}`, "utf8", (err, description) => {
          var title = queryData.id;
          var list = templateList(fileList);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`
          );
          res.writeHead(200);
          res.end(template);
        });
      });
    }
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

app.listen(3000);
