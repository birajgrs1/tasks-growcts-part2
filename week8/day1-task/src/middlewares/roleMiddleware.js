export const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Access Denied');
  }
  next();
};

export const requireDepartment = (dept) => (req, res, next) => {
  if (req.user.department !== dept) {
    return res.status(403).send('Department access denied');
  }
  next();
};
