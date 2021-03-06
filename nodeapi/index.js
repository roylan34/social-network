var express = require("express");
var app = express();
var morgan = require("morgan");
var dotEnv = require("dotenv");
var mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");

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

app.use(cookieParser());

app.use(cors());

//Routes
var { postRoutes, authRoutes, userRoutes } = require("./routes");
app.use("/v1", postRoutes);
app.use("/v1", authRoutes);
app.use("/v1", userRoutes);
app.use((error, req, res, next) => {
  if (error === "invalidToken") {
    return res.status(401).json({ error: "unathorized access" });
  }
});

var port = process.env.DEV_PORT || 5000;
app.listen(port, () => {
  console.log(`App listening in port http://localhost:${port}`);
});
