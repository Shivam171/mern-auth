import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true, // cookie can only be accessed by the web server and prevents XSS (Cross-Site-Scripting) attacks
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict", // helps in prevent CSRF (Cross-Site-Request-Forgery) attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return token;
}