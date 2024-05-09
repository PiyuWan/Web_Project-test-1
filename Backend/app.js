import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import userRouter from "./routes/user-rotes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
  .connect(`mongodb+srv://harsha:harsha123@cluster0.yy1rzwn.mongodb.net`)
  .then(() => app.listen(5001, () => console.log("connect to DB")))
  .catch((e) => console.log(e));
