import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payroll", payrollSchema);
