import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization token is missing" });
        }

        const decodedData = jwt.verify(token, "test");
        req.userId = decodedData.id;

        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default auth;
