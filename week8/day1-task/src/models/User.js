import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
    },
    role: {
      type: String,
      enum: ["admin", "HR", "manager", "employee"],
      required: [true, "Role is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    isOTPVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
