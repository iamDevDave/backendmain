// src/middlewares/authorizeMiddleware.js
export const authorize = (req, res, next) => {
    // Debugging line
    console.log(req.user);  // Check if the user is being set correctly
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
};
