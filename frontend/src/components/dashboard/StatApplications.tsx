import {
	Send,
	MessagesSquare,
	BadgeDollarSign,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApplicationStats } from "../../api/applicationApi";
import type { ApplicationStats } from "../../types/application";
import type { LucideIcon } from "lucide-react";

const statDefinitions = [
	{
		key: "sent",
		label: "Sent",
		description: "Applications sent",
		icon: Send,
		color: "text-info",
	},
	{
		key: "interview",
		label: "Interview",
		description: "Interviews scheduled",
		icon: MessagesSquare,
		color: "text-secondary",
	},
	{
		key: "offer",
		label: "Offer",
		description: "Offers received",
		icon: BadgeDollarSign,
		color: "text-success",
	},
	{
		key: "rejected",
		label: "Rejected",
		description: "Rejected applications",
		icon: XCircle,
		color: "text-error",
	},
] satisfies Array<{
	key: keyof ApplicationStats;
	label: string;
	description: string;
	icon: LucideIcon;
	color: string;
}>;

function StatApplications() {

	const [applicationStats, setApplicationStats] = useState<ApplicationStats | null>(null);

	useEffect(() => {
		const fetchApplicationStats = async () => {
			try {
				const stats = await getApplicationStats();
				setApplicationStats(stats);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
			}
		}

		fetchApplicationStats();
	}, []);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{statDefinitions.map(({ key, label, description, icon: Icon, color }) => (
				<div className="stats bg-base-200 shadow" key={key}>
					<div className="stat">
						<div className={`stat-figure ${color}`}>
							<Icon size={28} />
						</div>

						<div className="stat-title">{label}</div>
						<div className="stat-value">{applicationStats ? applicationStats[key] : 0}</div>
						<div className="stat-desc">{description}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default StatApplications;