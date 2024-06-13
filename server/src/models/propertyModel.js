const mongoose = require("mongoose");
const paymentPlanSchema = new mongoose.Schema({
  monthly: {
    type: Number,
    required: true,
  },
  downPayment: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

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

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number, 
    required: true, 
  },
  lng: {
    type: Number,
    required: true,
  },
});

const propertySchema = new mongoose.Schema(
  {
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    thumbnail: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    reference_No: Number,
    name: multiLanguage,
    addressLocality: multiLanguage,
    min_price: {
      type: Number,
      required: true,
    },
    max_price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    number_of_bathrooms: {
      type: Number,
      required: true,
    },
    number_of_bedrooms: {
      type: Number,
      required: true,
    },
    finishing: {
      type: String,
      enum: ["Not Finished", "Semi Finished", "Finished", "Furnished"],
      required: true,
      trim: true,
    },
    resale: {
      type: Boolean,
      default: false,
    },
    paymentPlans: [paymentPlanSchema],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
      },
    ],
    delivery_in: String,
    sale_type: {
      type: String,
    },
    forSale: {
      type: Boolean,
      default: false,
    },
    forRent: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },

    contactUs: Number,
    max_unit_area: Number,
    location: locationSchema,
    description: multiLanguage,

    area: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
      },
    ],
    compound: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Compound",
      },
    ],
    developer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer",
      },
    ],
  },
  { timestamps: true }
);

propertySchema.pre(/^find/, function (next) {
  this.populate({
    path: "area",
    select: "title",
  })
    .populate({
      path: "compound",
      select: "name images",
    })
    .populate("developer")
    .populate("type");
  next();
});

const propertyModel = mongoose.model("Property", propertySchema);

module.exports = propertyModel;
