const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    propertiesAvailable: { type: Number, default: 0 },
    description: {
      en: { type: String, required: false },
      ar: { type: String, required: false },
    },
    callUsNumber: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    location: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    launches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Launch" }],
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Developer" }],
    compounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Compound" }],
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

const areaModel = mongoose.model("Area", areaSchema);

module.exports = areaModel;



// const areaSchema = new mongoose.Schema(
//   {
//     title: {
//       en: String,
//       ar: String,
//     },
//     propertiesAvailable: Number,
//     description: {
//       en: String,
//       ar: String,
//     },
//     callUsNumber: Number,
//     images: [
//       {
//         url: { type: String, required: true },
//       },
//     ],
//     location:{
//       lat: {
//         type: Number,
//         required: true,
//       },
//       long: {
//         type: Number,
//         required: true,
//       },
//     },

//     launches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Launch" }],
//     developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Developer" }],
//     compounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Compound" }],
//     properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
//   },
//   {
//     timestamps: true,
//   }
// );
