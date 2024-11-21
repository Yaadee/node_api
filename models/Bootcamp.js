const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
      "Please provide a valid URL",
    ],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number cannot be longer than 20 characters"],
  },
  address: {
    type: String,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    max: [10, "Rating cannot be more than 10"],
    default: 0,
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//  Create bootcamp slug from the name
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// Geocode and create location field
BootcampSchema.pre("save", async function (next) {
  try {
    const loc = await geocoder.geocode(this.address);// Take location from address enterd from user to get geo key
    console.log(loc);
    if (loc && loc.length > 0 && loc[0]?.latitude && loc[0]?.longitude) {
      this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0]?.formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
      };
    } else {
      this.location = null;
    }

    //  Do not save address in DB
    this.address = undefined;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Bootcamps", BootcampSchema);
