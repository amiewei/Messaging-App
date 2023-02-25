var express = require("express");
var app = express();

var path = __dirname + "/dist";
var port = 8080;

app.use(express.static(path));

//not working
// app.use((req, res, next) => {
//   var host = req.get("Host");
//   console.log("redirect middleware");
//   console.log(host);
//   console.log(req.originalUrl);
//   if (host === "messaging-app-ssr.onrender.com") {
//     console.log("redirecting");
//     return res.redirect(301, "https://chirp.ddns.net" + req.originalUrl);
//   }
//   return next();
// });

app.get("*", function (req, res) {
  console.log("catch all");
  console.log(path);
  res.sendFile(path + "/index.html");
});
app.listen(port);
