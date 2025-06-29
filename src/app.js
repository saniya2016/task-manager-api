const express = require("express");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

app.use(express.json());

app.get("/info", (req, res) => {
  res.json({ success: true, message: "Task Management API is live" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;
