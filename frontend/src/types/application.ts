export type ApplicationStatus =
	| "DRAFT"
	| "APPLIED"
	| "SCREENING"
	| "INTERVIEW"
	| "OFFER"
	| "REJECTED"
	| "WITHDRAWN";

export type ApplicationSource =
	| "LINKEDIN"
	| "WELCOME_TO_THE_JUNGLE"
	| "INDEED"
	| "COMPANY_WEBSITE"
	| "OTHER";

export interface Application {
	id: string;
	userId: string;
	companyName: string;
	jobTitle: string;
	location: string | null;
	description: string | null;
	applicationDate: string;
	applicationSource: ApplicationSource | null;
	status: ApplicationStatus;
	createdAt: string;
	updatedAt: string;
}

export interface ApplicationStats {
	sent: number;
	interview: number;
	offer: number;
	rejected: number;
}