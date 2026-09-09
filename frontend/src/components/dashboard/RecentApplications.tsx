import { EllipsisVertical, MapPin } from "lucide-react";
import { getRecentApplications } from "../../api/applicationApi";
import { useEffect, useState } from "react";
import type { Application } from "../../types/application";
import { toast } from "sonner";

function RecentApplications() {

	const statusClasses: Record<string, string> = {
		applied: "badge  badge-info",
		interview: "badge  badge-warning",
		rejected: "badge  badge-error",
		accepted: "badge  badge-success",
		draft: "badge  badge-ghost",
	};

	const [recentApplications, setRecentApplications] = useState<Application[]>([]);

	useEffect(() => {
		const fetchRecentApplications = async () => {
			try {
				const app = await getRecentApplications();
				setRecentApplications(app);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
			}
		}

		fetchRecentApplications();
	}, []);

	return (
		<div className="card bg-base-200 shadow-sm">
			<div className="card-body">

				{/* Header */}
				<div className="flex items-center justify-between">
					<h2 className="card-title">
						Recent applications
					</h2>

					<button className="btn btn-ghost btn-sm">
						View all
					</button>
				</div>

				{recentApplications.length === 0 ? (
					<p className="mt-4">Nothing to display...</p>
				) : (
					<div className="overflow-x-auto mt-4">
						<table className="table">
							<thead>
								<tr>
									<th>Company</th>
									<th>Position</th>
									<th>Location</th>
									<th>Date</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody>
								{recentApplications.map((application) => (
									<tr key={application.id}>
										<td>
											<span className="font-medium">
												{application.companyName}
											</span>
										</td>

										<td>
											{application.jobTitle}
										</td>

										<td>
											<div className="flex items-center gap-1 text-sm text-base-content/70">
												<MapPin size={16} />
												{application.location}
											</div>
										</td>

										<td>
											{new Date(
												application.applicationDate
											).toLocaleDateString("fr-FR")}
										</td>

										<td>
											<span className={ statusClasses[application.status.toLowerCase()] ?? "badge badge-ghost" }>
												{application.status.toLowerCase()}
											</span>
										</td>
										<td className="w-12 text-right">
											<button className="btn btn-ghost btn-circle btn-sm ml-auto">
											<EllipsisVertical size={18} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default RecentApplications;
