import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export default mongoose.model("OTP", otpSchema);
