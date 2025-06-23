import Employee from '../models/Employee.js';
import AuditLog from '../models/AuditLog.js';

export const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.render('employees', { employees, user: req.user, title: 'Employee' });
};

export const terminateEmployee = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  await AuditLog.create({
    actor: req.user._id,
    action: 'terminate_employee',
    target: emp._id,
    ip: req.ip,
    endpoint: req.originalUrl,
    dataBefore: emp.toObject(),
    dataAfter: null
  });
  await emp.deleteOne();
  res.redirect('/employees');
};
