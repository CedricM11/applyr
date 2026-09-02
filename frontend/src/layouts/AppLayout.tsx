import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";

function AppLayout() {
	return (
		<div className="drawer lg:drawer-open">
			<input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content">
				<main className="min-h-screen bg-base-100">
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