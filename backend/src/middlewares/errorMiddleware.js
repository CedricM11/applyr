import { AppError } from "../utils/AppError.js";

export function errorHandler(error, req, res, next) {
	console.error(error);

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			message: error.message,
			code: error.code
		});
	}

	return res.status(500).json({
		message: "Internal server error"
	});
}