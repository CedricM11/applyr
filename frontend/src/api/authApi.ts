import { isAxiosError } from "axios";
import api from "./axios";

export const login = async (email: string, password: string) => {
	try {
		const response = await api.post("/auth/login", {
			email,
			password
		});
	
		return response.data;
	} catch (error) {

		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message)
		}

		throw error;
	}
}

export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
	try {
		const response = await api.post("/auth/register", {
			name,
			email,
			password,
			confirmPassword
		});

		return response.data;

	} catch (error) {
		
		if (isAxiosError(error)) {
			const message = error.response?.data.message ?? "An unexpected error occurred";
			throw new Error(message);
		}

		throw error;
	}
}

export const getMe = async () => {
	try {
		console.log("send request");
		const response = await api.get("/auth/me");
		return response.data;

	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data.message ?? "An unexpected error occurred";
			throw new Error(message);
		}

		throw error;
	}
}