import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: '7d'
    });
    // In your generateToken function
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none", 
        secure: true,
        domain: process.env.NODE_ENV === "production" ? "frontend-foudup.vercel.app" : "localhost"
    });
    return token;
};