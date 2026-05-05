const { body } = require("express-validator");

exports.createBookingValidator = [
  body("date")
    .exists()
    .withMessage("Date is required")
    .bail()
    .isISO8601()
    .withMessage("Invalid date format"),

  body("details")
    .exists()
    .withMessage("Details is required")
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Details must be at least 5 characters"),
];

exports.updateStatusValidator = [
  body("status")
    .exists()
    .withMessage("Status is required")
    .bail()
    .isIn(["approved", "rejected"])
    .withMessage("Status must be approved or rejected"),
];
