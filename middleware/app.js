const express = require("express");
const schoolRouter = require("../routes/school");
const classRoom = require("../routes/classRoom");

const app = express();
app.use(express.json());
app.use("/api/v1/school/", schoolRouter);
app.use("/api/v1/classroom/", classRoom);

module.exports = app;
