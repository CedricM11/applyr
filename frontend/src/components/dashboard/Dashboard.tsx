import RecentApplications from "./RecentApplications";
import StatApplications from "./StatApplications";
import { useAuthStore } from "../../stores/authStore";
import { CirclePlus } from 'lucide-react';

function Dashboard() {
	const user = useAuthStore((state) => state.user)

	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex items-center justify-between">
				<div className="mb-5">
					<h1 className="text-2xl font-bold">Hello { user?.name ?? "Guest" } 👋</h1>
					<p className="mt-1 text-sm text-base-content/60">Here is an overview of your applications</p>
				</div>
				<div className="btn btn-primary">
					<CirclePlus size={16}/>
					New application
				</div>
			</div>
			<div className="flex flex-col gap-y-5">
				<StatApplications />
				<RecentApplications />
			</div>
		</div>
	)
}

export default Dashboard