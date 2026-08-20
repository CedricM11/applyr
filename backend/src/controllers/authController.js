import { registerUser, loginUser, createNewAccessToken, getUserById } from "../services/authService.js";
import { AppError } from "../utils/AppError.js";

export const register = async (req, res, next) => {
	try {
		const { user, accessToken, refreshToken } = await registerUser(req.body);
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: "/api/auth/refresh"
		});
		res.status(201).json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		});
	} catch (error) {
		next(error);
	}
}

export const login = async (req, res, next) => {
	try {
		const { user, accessToken, refreshToken } = await loginUser(req.body);
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: "/api/auth/refresh"
		});
		res.status(200).json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		});
	} catch (error) {
		next(error);
	}
}

export const logout = (req, res, next) => {
	try {
		res.clearCookie("accessToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict"
		});
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict"
		});

		res.status(200).json({
			message: "Logged out successfully"
		});
	} catch (error) {
		next(error);
	}
}

export const refresh = async (req, res, next) => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) {
			throw new AppError("Refresh token missing", 401);
		}

		const newAccessToken = createNewAccessToken(refreshToken);
		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000
		});

		return res.status(200).json({
			message: "Access token refreshed"
		});

	} catch (error) {
		next(error);
	}
}

export const getProfile = async (req, res, next) => {
	try {
		const user = await getUserById(req.user.userId);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
}