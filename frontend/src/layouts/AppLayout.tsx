import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";
import { Menu } from "lucide-react";

function AppLayout() {
	return (
		<div className="drawer lg:drawer-open">
			<input
				id="sidebar-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>

			<div className="drawer-content">
				<div className="navbar bg-base-200 lg:hidden">
					<div className="flex-none">
						<label
							htmlFor="sidebar-drawer"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost"
						>
							<Menu size={24} />
						</label>
					</div>

					<div className="flex-1">
						<span className="text-lg font-bold">
							Applyr
						</span>
					</div>
				</div>

				<main className="min-h-screen bg-base-100 p-5">
					<Outlet />
				</main>
			</div>

			<div className="drawer-side">
				<label
					htmlFor="sidebar-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				/>

				<Sidebar />
			</div>
		</div>
	);
}

export default AppLayout;