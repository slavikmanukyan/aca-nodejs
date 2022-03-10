const validationError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    res.status(400).json({
      errors: messages,
    });
  } else {
    next(err);
  }
}

const authorizationError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      errors: ["Invalid token"],
    });
  } else {
    next(err);
  }
}

module.exports = {
  validationError,
  authorizationError,
}