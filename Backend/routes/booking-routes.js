import express  from "express";
import { getBookingById, newBooking,deleteBooking } from "../controllers/booking-controller.js";

const bookingsRouter = express.Router();
bookingsRouter.post("/",newBooking)
bookingsRouter.get("/:id",getBookingById)
bookingsRouter.delete("/:id",deleteBooking)

export default bookingsRouter;