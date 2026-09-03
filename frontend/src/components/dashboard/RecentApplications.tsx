import { EllipsisVertical, MapPin } from "lucide-react";

function RecentApplications() {
	const applications = [
		{
			id: 1,
			company: "Amadeus",
			position: "Frontend Developer",
			location: "Nice",
			date: "02/09/2026",
			status: "Applied",
		},
		{
			id: 2,
			company: "Ubisoft",
			position: "Web Developer",
			location: "Sophia Antipolis",
			date: "31/08/2026",
			status: "Interview",
		},
		{
			id: 3,
			company: "Capgemini",
			position: "Fullstack Developer",
			location: "Nice",
			date: "29/08/2026",
			status: "Rejected",
		},
		{
			id: 4,
			company: "Accenture",
			position: "Software Developer",
			location: "Monaco",
			date: "27/08/2026",
			status: "Accepted",
		},
		{
			id: 5,
			company: "Air France",
			position: "Frontend Developer",
			location: "Paris",
			date: "25/08/2026",
			status: "Draft",
		},
	];

	const statusClasses: Record<string, string> = {
		Applied: "badge  badge-info",
		Interview: "badge  badge-warning",
		Rejected: "badge  badge-error",
		Accepted: "badge  badge-success",
		Draft: "badge  badge-ghost",
	};

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

				{/* Table */}
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
							{applications.map((application) => (
								<tr key={application.id}>
									<td>
										<span className="font-medium">
											{application.company}
										</span>
									</td>

									<td>
										{application.position}
									</td>

									<td>
										<div className="flex items-center gap-1 text-sm text-base-content/70">
											<MapPin size={16} />
											{application.location}
										</div>
									</td>

									<td>
										{application.date}
									</td>

									<td>
										<span className={ statusClasses[application.status] ?? "badge badge-ghost" }>
											{application.status}
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
			</div>
		</div>
	);
}

export default RecentApplications;
