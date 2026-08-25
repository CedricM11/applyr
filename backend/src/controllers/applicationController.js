import * as applicationService from "../services/applicationService.js";


export const getAllApplications = async (req, res, next) => {
	try {
		const userId = req.user.userId;

		const applications = await applicationService.getAllApplications(userId);

		res.status(200).json(applications);
	} catch (error) {
		next(error);
	}
};


export const getApplicationById = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const { id } = req.params;

		const application = await applicationService.getApplicationById(id, userId);

		res.status(200).json(application);
	} catch (error) {
		next(error);
	}
};


export const createApplication = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const application = req.body;

		const createdApplication = await applicationService.createApplication(userId, application);

		res.status(201).json(createdApplication);
	} catch (error) {
		next(error);
	}
};


export const updateApplication = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const { id } = req.params;
		const application = req.body;

		const updatedApplication = await applicationService.updateApplication(id, userId, application);

		res.status(200).json(updatedApplication);
	} catch (error) {
		next(error);
	}
};


export const deleteApplication = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const { id } = req.params;

		await applicationService.deleteApplication(id, userId);

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};