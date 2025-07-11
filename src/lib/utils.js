import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: '7d'
    });
    
    // Updated cookie settings for production
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production", // Always true in production
        domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined
    });
    return token;
};