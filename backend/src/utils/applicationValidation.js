import { AppError } from "./AppError.js";
import { APPLICATION_SOURCES, APPLICATION_STATUSES } from "../constants/applications.js";

export const validateString = (value, fieldName, required = false) => {
	if (value === undefined || value === null) {
		if (required) {
			throw new AppError(`${fieldName} is required`, 400);
		}

		return null;
	}

	if (typeof value !== "string") {
		throw new AppError(`${fieldName} must be a string`, 400);
	}

	const trimmedValue = value.trim();

	if (required && trimmedValue === "") {
		throw new AppError(`${fieldName} is required`, 400);
	}

	return trimmedValue;
};

export const validateEnum = (value, fieldName, allowedValues, required = false) => {
	if (value === undefined || value === null) {
		if (required) {
			throw new AppError(`${fieldName} is required`, 400);
		}

		return null;
	}

	if (!allowedValues.includes(value)) {
		throw new AppError(
			`${fieldName} must be one of: ${allowedValues.join(", ")}`,
			400
		);
	}

	return value;
};

export const validateDate = (value, fieldName, required = false) => {
	if (value === undefined || value === null) {
		if (required) {
			throw new AppError(`${fieldName} is required`, 400);
		}

		return null;
	}

	const date = new Date(value);

	if (isNaN(date.getTime())) {
		throw new AppError(`${fieldName} must be a valid date`, 400);
	}

	return date;
};

export const buildApplicationData = (application) => {
	const {
		companyName,
		jobTitle,
		location,
		description,
		applicationDate,
		applicationSource,
		status
	} = application;

	return {
		companyName: validateString(
			companyName,
			"Company name",
			true
		),

		jobTitle: validateString(
			jobTitle,
			"Job title",
			true
		),

		location: validateString(
			location,
			"Location"
		),

		description: validateString(
			description,
			"Description"
		),

		applicationDate: validateDate(
			applicationDate,
			"Application date"
		),

		applicationSource: validateEnum(
			applicationSource,
			"Application source",
			APPLICATION_SOURCES
		),

		status: validateEnum(
			status,
			"Status",
			APPLICATION_STATUSES
		)
	};
};