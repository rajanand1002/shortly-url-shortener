require("dotenv").config();

const port = Number(process.env.PORT) || 8001;

module.exports = {
  port,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/short-url",
  baseUrl: (process.env.BASE_URL || `http://localhost:${port}`).replace(/\/$/, ""),
};
