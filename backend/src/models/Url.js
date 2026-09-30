const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: 
    { 
      type: String, 
      required: true, 
      unique: true 
    },
    redirectURL: 
    { 
      type: String, 
      required: true 
    },
    visitHistory: 
    [
      {
        _id: false, 
        timestamp: 
        { type: Number, 
          required: true 
        } 
      }
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Url", urlSchema);
