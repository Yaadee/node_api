const mongoose = require("mongoose");
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trin: true,
    maxlength: [50, "Name cannot be more than 50 characters "],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "please add a description"],
    maxlength: [500, "Name cannot be more than 500 characters "],
  },
  website: {
    type: String,
    match: [
      /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
      "PLease provide valid url",
    ],
  },
  email: {
    type: String,

    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email address",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 2- characters"],
  },
  address: {
    type: String,
    required: [false, "please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["point"],
      required: false,
    },
    coordinates: {
      type: [[[Number]]],
      required: false,
      index: "2dsphere",
    },
    FormattedAddress: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
  },
  careers: {
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science ",
      "Business",
      "Other",
    ],
  },
  avageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
    default: 0,
  },
  avageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: String,
    Boolean: true,
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
module.exports = mongoose.model("Bootcamps", BootcampSchema);
