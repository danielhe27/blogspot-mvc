function withAuth(req, res, next) {
  // Check if user ID is present in session
  if (!req.session.user_id) {
      // If user is not authenticated, send a 401 Unauthorized status and a message
      res.status(401).json({ message: "Please log in to continue" });
  } else {
      // If user is authenticated, call the next middleware function
      next();
  }
}


module.exports = withAuth;
