const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
//stablish Router
const productRouter = require("./routes/productsRouts");
app.use("/", productRouter);

module.exports = app;
