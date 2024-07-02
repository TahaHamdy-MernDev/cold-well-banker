const mongoose = require("mongoose");

const multiLanguage = {
  en: {
    type: String,
    trim: true,
  },
  ar: {
    type: String,
    trim: true,
  },
};

const typeSchema = new mongoose.Schema(
  {
    name: multiLanguage,
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

  },
  { timestamps: true }
);
typeSchema.pre(/^find/, function (next) {
    this.populate({ path: "properties"})
    next();
  });
  
const typeModel = mongoose.model("Type", typeSchema);

module.exports = typeModel;
