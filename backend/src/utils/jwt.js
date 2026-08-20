import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (userId) => {
	const token = jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"});
	return token;
}

export const generateRefreshToken = (userId) => {
	const token = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
	return token;
}

export const verifyAccessToken = (token) => {
	return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export const verifyRefreshToken = (token) => {
	return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}