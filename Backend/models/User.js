import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
  booking: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bookings",
    },
  ],
});

export default mongoose.model("User", userSchema);
