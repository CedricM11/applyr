import { registerUser } from "../services/authService.js";

export const register = async (req, res, next) => {
	try {
		const { user, token } = await registerUser(req.body);
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict"
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