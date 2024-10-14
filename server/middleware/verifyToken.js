import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized, No token found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized, Invalid token"
            });
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
        console.log("Error while verifying token", error);
        return res.status(500).json({
            success: false,
            message: "Unauthorized, Invalid token"
        });
    }
}