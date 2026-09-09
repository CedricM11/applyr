import api from "./axios";
import { isAxiosError } from "axios";
import type { ApplicationStats } from "../types/application";

export const getRecentApplications = async () => {

	try {
		const response = await api.get("/application/recents");
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message, { cause: error });
		}
		throw error;
	}
}

export const getApplicationStats = async (): Promise<ApplicationStats> => {
	try {
		const response = await api.get<ApplicationStats>("/application/stats");
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message, { cause: error });
		}
		throw error;
	}
}