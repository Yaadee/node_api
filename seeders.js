const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

//  load env vars
dotenv.config({ path: "./config/config.env" });
//  load models

const Bootcamp = require("./models/Bootcamp");
// connect to database
mongoose.connect(process.env.MONGO_URI);
//  Read the json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`)
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported ...".green.inverse);
    process.exit(1);
  } catch (err) {
    console.error(err);
  }
};

//  Delete the data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany(bootcamps);
    console.log("Data Distroyed ...".green.inverse);
    process.exit(1);
  } catch (err) {
    console.error(err);
  }
};
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
