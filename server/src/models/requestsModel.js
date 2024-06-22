const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    academy: { type: Boolean, default: false },
    contact: { type: Boolean, default: false },
    property: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const requestsModel = mongoose.model("Requests", requestSchema);

module.exports = requestsModel;
