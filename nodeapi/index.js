var express = require("express");
var app = express();

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
