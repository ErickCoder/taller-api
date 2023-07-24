const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Routes

const usersRoutes = require("./routes/users.route");
const repairsRoutes = require("./routes/repairs.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/repairs", repairsRoutes);

module.exports = app;
