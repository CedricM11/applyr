export function getCompanyDomain(companyName: string): string {
	return `${companyName
		.toLowerCase()
		.replace(/\s+/g, "")}.com`;
}