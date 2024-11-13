const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Preserve the original name of the error
  error.name = err.name;

  // Console log the stack for development
  console.log(err.name);
  console.log(err.stack.red);

  // Handle specific Mongoose errors
  if (err.name === "CastError") {
    const message = `Bootcamper not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
