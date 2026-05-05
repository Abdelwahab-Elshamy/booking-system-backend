const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const validate = require("../middlewares/validate");
const {
  createBookingValidator,
  updateStatusValidator,
} = require("../validators/booking.validator");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/booking.controller");

router.post("/", verifyToken, createBookingValidator, validate, createBooking);
router.get("/mine", verifyToken, getMyBookings);
router.get("/", verifyToken, isAdmin, getAllBookings);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  updateStatusValidator,
  validate,
  updateBookingStatus,
);
router.delete("/:id", verifyToken, isAdmin, deleteBooking);

module.exports = router;
