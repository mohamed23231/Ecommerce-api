const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
const AppError=require("./utilities/appError")

//stablish Router
const productRouter = require("./routes/productsRouts");
app.use("/", productRouter);

// this route if we can't find his route in all routes
app.all("*", (req,res,next)=>{
    // res.status(404).json({
    //     status: "fail",
    //     message: "",
    // });
    // const err = new Error (`can't fint this `);
    // err.status ='fail';
    // err.statusCode=404
    next(new AppError(`couldn't find this ${req.originalUrl}`,404));
});

/// error handler()

app.use((err,req,res,next)=>{
    err.status=err.status|| 'error';
    err.statusCode = err.statusCode || 500
    res.status(err.statusCode || 500).json({
        status: "fail",
        message: err.message,
    });
});
module.exports = app;
