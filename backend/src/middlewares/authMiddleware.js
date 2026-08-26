import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
	try {
		const accessToken = req.cookies?.accessToken;
		if (!accessToken) {
			throw new AppError("Access token missing", 401, "ACCESS_TOKEN_MISSING");
		}

		const decoded = verifyAccessToken(accessToken);
		req.user = decoded;

		next();
	} catch (error) {
		if (error instanceof AppError) {
			return next(error);
		}
		next(new AppError("Invalid or expired access token", 401, "ACCESS_TOKEN_INVALID"));
	}
}