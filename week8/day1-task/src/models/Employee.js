import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee name is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary must be positive']
  }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
