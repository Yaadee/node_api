const Bootcamp = require("../models/Bootcamp");

// @desc Get all bootcamps
// @route Get api/v1/bootcamps
// @access public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};
// @desc Get all bootcamp
// @route Get api/v1/bootcamp/:id
// @access public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

// @desc create bootcamp
// @route POST api/v1/bootcamps
// @access private
exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(2001)
    .json({ success: true, data: bootcamp});
};

// @desc update bootcamp
// @route PUT api/v1/bootcamp/:id
// @access private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};
// @desc delete bootcamp
// @route PUT api/v1/bootcamp/:id
// @access private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
