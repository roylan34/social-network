var express = require("express");
var app = express();
var morgan = require("morgan");
var dotEnv = require("dotenv");
var mongoose = require("mongoose");
var cors = require("cors");

//Environment variable
dotEnv.config();

//db
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => console.log("DB connection failed"));

//Middleware
app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

//Routes
var { postController } = require("./routes");
app.use("/v1", postController);

var port = process.env.DEV_PORT || 5000;
app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});
