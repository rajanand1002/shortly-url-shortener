const path = require("path");
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/url.routes");
const redirectRoutes = require("./routes/redirect.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist"))); // serves the React build (frontend/dist) at "/"

app.use("/url", urlRoutes);
app.use("/", redirectRoutes); // keep last: it matches any single path segment

app.use(errorHandler);

module.exports = app;
