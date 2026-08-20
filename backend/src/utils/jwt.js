import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET) {
	throw new Error("Missing JWT_ACCESS_SECRET environment variable");
}

if (!JWT_REFRESH_SECRET) {
	throw new Error("Missing JWT_REFRESH_SECRET environment variable");
}

export const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token) => {
	return jwt.verify(token, JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
	return jwt.verify(token, JWT_REFRESH_SECRET);
};