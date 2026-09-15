import api from "./axios";
import { isAxiosError } from "axios";
import type { Application, ApplicationForm, ApplicationStats } from "../types/application";

export const getApplicationById = async (applicationId: string) => {
	try {
		const response = await api.get(`/application/${applicationId}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message, { cause: error });
		}
		throw error;
	}
}

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

export const createApplication = async (applicationForm: ApplicationForm): Promise<Application> => {
	try {
		const response = await api.post("/application", applicationForm);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message, { cause: error });
		}
		throw error;
	}
}

export const updateApplication = async (applicationForm: ApplicationForm, applicationId: string): Promise<Application> => {
	try {
		const response = await api.put(`/application/${applicationId}`, applicationForm);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			const message = error.response?.data?.message ?? "An unexpected error occurred";
			throw new Error(message, { cause: error });
		}
		throw error;
	}
}