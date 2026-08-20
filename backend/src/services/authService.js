import { AppError } from "../utils/AppError.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUser = async ({ name, email, password, confirmPassword }) => {
	if (!name || !email || !password || !confirmPassword) {
		throw new AppError("All fields are required", 400);
	}
	if (name.length > 100) {
		throw new AppError("user name too long - max 100 characters", 400);
	}
	if(!EMAIL_REGEX.test(email)) {
		throw new AppError("Invalid email format", 400);
	}
	if (password.length < 8) {
		throw new AppError("Password must be at least 8 characters long", 400);
	}
	if (password !== confirmPassword) {
		throw new AppError("Password and confirmPassword must match", 400);
	}

	const normalizedEmail = email.trim().toLowerCase();
	const existingUser = await prisma.user.findUnique({
		where: {
			email: normalizedEmail
		}
	});
	if (existingUser) {
		throw new AppError("Unable to create account", 400);
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			name,
			email: normalizedEmail,
			password: hashedPassword
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true
		}
	});

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	return {
		user,
		accessToken,
		refreshToken
	};
}

export const loginUser = async ({ email, password }) => {
	if (!email || !password) {
		throw new AppError("All fields are required", 400);
	}

	const normalizedEmail = email.trim().toLowerCase();
	const existingUser = await prisma.user.findUnique({
		where: {
			email: normalizedEmail
		}
	})
	if (!existingUser) {
		throw new AppError("Invalid credentials", 400);
	}

	const match = await bcrypt.compare(password, existingUser.password);
	if (!match) {
		throw new AppError("Invalid credentials", 400);
	}

	const accessToken = generateAccessToken(existingUser.id);
	const refreshToken = generateRefreshToken(existingUser.id);
	const user = {
		id: existingUser.id,
		name: existingUser.name,
		email: existingUser.email
	}

	return {
		user,
		accessToken,
		refreshToken
	};
}

export const createNewAccessToken = (token) => {

	try {
		const decoded = verifyRefreshToken(token);
		return generateAccessToken(decoded.userId);
	} catch (error) {
		throw new AppError("Invalid or expired refresh token", 401);
	}
}

export const getUserById = async (id) => {
	if (!id) {
		throw new AppError("id missing", 401);
	}
	const user = await prisma.user.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true
		}
	});
	if (!user) {
		throw new AppError("User not found", 404);
	}

	return user;
}