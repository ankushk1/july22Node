const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/july22Pro");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("error connecting to DB", err);
});

db.once("open", () => {
  console.log("Successfully connected to DB");
});
