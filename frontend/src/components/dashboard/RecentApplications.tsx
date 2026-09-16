import { MapPin, Trash2, SquarePen } from "lucide-react";
import { getRecentApplications, deleteApplication } from "../../api/applicationApi";
import { useEffect, useState } from "react";
import type { Application } from "../../types/application";
import { toast } from "sonner";
import { Link } from "react-router";

type RecentApplicationsProps = {
	onApplicationDeleted: () => void;
}

function RecentApplications({ onApplicationDeleted }: RecentApplicationsProps) {

	const statusClasses: Record<string, string> = {
		applied: "badge  badge-info",
		interview: "badge  badge-warning",
		screening: "badge  badge-warning",
		rejected: "badge  badge-error",
		offer: "badge  badge-success",
		draft: "badge  badge-ghost",
	};

	const [recentApplications, setRecentApplications] = useState<Application[]>([]);
	const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);

	useEffect(() => {
		const fetchRecentApplications = async () => {
			try {
				const app = await getRecentApplications();
				setRecentApplications(app);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
			}
		}

		fetchRecentApplications();
	}, []);

	const closeDeleteDialog = () => {
		setApplicationToDelete(null);
	}

	const handleDelete = async () => {
		if (!applicationToDelete) return;

		try {
			await deleteApplication(applicationToDelete.id);
			const app = await getRecentApplications();
			setRecentApplications(app);
			onApplicationDeleted();
			closeDeleteDialog();
			toast.success("Application deleted successfully");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
		}
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
									<th>Actions</th>
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
											<div className="flex items-center">
												<Link to={`/update/${application.id}`} className="btn btn-ghost btn-sm p-2">
													<SquarePen size={18} />
												</Link>
												<button className="btn btn-ghost btn-sm p-2" onClick={() => setApplicationToDelete(application)}>
													<Trash2 size={18} color="red"/>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				{applicationToDelete && (
					<div className="modal modal-open">
						<div className="modal-box">
							<h3 className="text-lg font-bold">Delete application</h3>
							<p className="py-4">Are you sure you want to delete this application?</p>

							<div className="modal-action">
								<button
									className="btn btn-error"
									type="button"
									onClick={handleDelete}
								>
									Delete
								</button>

								<button
									className="btn"
									type="button"
									onClick={closeDeleteDialog}
								>
									Cancel
								</button>
							</div>
						</div>

						<div
							className="modal-backdrop"
							onClick={closeDeleteDialog}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default RecentApplications;
