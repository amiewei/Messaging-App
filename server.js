var express = require("express");
var app = express();

var path = __dirname + "/dist";
var port = 8080;

app.use(express.static(path));
app.get("*", function (req, res) {
  console.log("catch all");
  console.log(path);
  res.sendFile(path + "/index.html");
});
app.listen(port);
