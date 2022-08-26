const express = require("express");
const schoolRouter = require("../routes/school");
const classRoomRouter = require("../routes/classRoom");
const classRouter = require("../routes/class");
const subjectRouter = require("../routes/subject");
const taskRouter = require("../routes/task");
const parentRouter = require("../routes/parents");
const studentRouter = require("../routes/student");

const app = express();
app.use(express.json());
app.use("/api/v1/school/", schoolRouter);
app.use("/api/v1/classroom/", classRoomRouter);
app.use("/api/v1/class/", classRouter);
app.use("/api/v1/subject/", subjectRouter);
app.use("/api/v1/task/", taskRouter);
app.use("/api/v1/parent/", parentRouter);
app.use("/api/v1/student/", studentRouter);

module.exports = app;
