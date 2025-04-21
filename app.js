const express = require("express");
const app = express();
const schoolController = require("./schoolController");

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.post("/addSchool", schoolController.addSchool);
app.get("/listSchools", schoolController.listSchools);

module.exports = app;
