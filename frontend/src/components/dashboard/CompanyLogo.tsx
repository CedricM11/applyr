import { useState } from "react";
import { getCompanyDomain } from "../../utils/company";
import { Building2 } from "lucide-react";

type CompanyLogoProps = {
	companyName: string;
}

function CompanyLogo({ companyName }: CompanyLogoProps) {

	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-base-300">
				<Building2 size={20} />
			</div>
		);
	}

	return (
		<img
			src={`https://logos.hunter.io/${getCompanyDomain(companyName)}`}
			alt={companyName}
			className="h-8 w-8 rounded-lg object-contain"
			onError={() => setHasError(true)}
		/>
	);
}

export default CompanyLogo