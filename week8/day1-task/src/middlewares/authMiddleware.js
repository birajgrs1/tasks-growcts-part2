export const isAuthenticated = (req, res, next) => {
  // console.log("Session Data:", req.session);
  if (!req.session.user) {
    return res.redirect('/login');  
  }
  req.user = req.session.user;  
  next();  
};
