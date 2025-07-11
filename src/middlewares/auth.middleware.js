import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // Debug logging (remove in production)
    console.log('Cookies received:', req.cookies);
    console.log('Authorization header:', req.headers.authorization);
    
    let token = req.cookies.jwt;
    
    // Fallback to Authorization header if cookie is not present
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - No Token Provided" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized - Invalid Token" });
    }
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Unauthorized - Invalid Token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Unauthorized - Token Expired" });
    }
    
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};