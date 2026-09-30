const mongoose = require("mongoose");
const { mongoUri } = require("./index");

const connectToMongoDB = () => mongoose.connect(mongoUri);

module.exports = { connectToMongoDB };
