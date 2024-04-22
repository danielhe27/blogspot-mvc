
function withAuth(req, res, next) {
  if (!req.session.user_id) {
      res.status(401).json({ message: "Please log in to continue" });
  } else {
      next();
  }
}

module.exports = withAuth;
