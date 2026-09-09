import prisma from "../db/prisma.js";
import { AppError } from "../utils/AppError.js";
import { buildApplicationData } from "../utils/applicationValidation.js";

export const getAllApplications = async (userId) => {
	const applications = await prisma.application.findMany({
		where: {
			userId: userId
		}
	});

	return applications;
}

export const getApplicationById = async (applicationId, userId) => {
	const application = await prisma.application.findUnique({
		where: {
			id: applicationId,
			userId
		}
	});

	if (!application) {
		throw new AppError("Application not found", 404);
	}

	return application;
}

export const getRecentApplications = async (userId) => {
	const recentApplications = await prisma.application.findMany({
		where: {
			userId
		},
		orderBy: {
			createdAt: "desc"
		},
		take: 5
	});

	return recentApplications;
}

export const getApplicationStats = async (userId) => {
	const groupedApplications = await prisma.application.groupBy({
		by: ["status"],
		where: {
			userId
		},
		_count: {
			_all: true
		}
	});

	const counts = Object.fromEntries(
		groupedApplications.map(({ status, _count }) => [
			status,
			_count._all
		])
	);

	return {
		sent: counts.APPLIED ?? 0,
		interview: counts.INTERVIEW ?? 0,
		offer: counts.OFFER ?? 0,
		rejected: counts.REJECTED ?? 0
	};
};

export const createApplication = async (userId, application) => {

	const applicationData = buildApplicationData(application);

	const createdApplication = await prisma.application.create({
		data: {
			userId,
			...applicationData
		}
	});

	return createdApplication;
}

export const updateApplication = async (applicationId, userId, application) => {

	const applicationData = buildApplicationData(application);

	const existingApplication = await prisma.application.findFirst({
		where: {
			id: applicationId,
			userId
		}
	});
	if (!existingApplication) {
		throw new AppError("Application not found", 404);
	}

	const updatedApplication = await prisma.application.update({
		where: {
			id: applicationId,
		},
		data: applicationData
	});

	return updatedApplication;
}

export const deleteApplication = async (applicationId, userId) => {

	const application = await prisma.application.findFirst({
		where: {
			id: applicationId,
			userId
		}
	});
	if (!application) {
		throw new AppError("Application not found", 404);
	}

	await prisma.application.delete({
		where: {
			id: applicationId
		}
	});
}