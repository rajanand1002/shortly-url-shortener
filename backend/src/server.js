require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const app = require("./app");
const { port } = require("./config");
const { connectToMongoDB } = require("./config/db");

connectToMongoDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Shortly running at http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
