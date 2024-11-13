const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");
const color = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamp");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middle ware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
// app.use(logger);

// Mount routes
app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const Server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
//  handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  //  close server & exit
  Server.close(() => {
    process.exit(1);
  });
});
