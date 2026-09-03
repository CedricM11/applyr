import { Link, NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "sonner";
import {
	LayoutDashboard,
	BriefcaseBusiness,
	Settings,
	LogOut,
} from "lucide-react";

function Sidebar() {

	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logged out successfully");
			navigate("/login");

		} catch (error) {
			toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
		}
		
	}

	return (
		<aside className="w-64 min-h-full bg-base-200 flex flex-col">
			{/* Logo */}
			<div className="h-16 flex items-center px-6 gap-x-3">
				<img src="/logo.svg" alt="applyr-logo" className="w-7 h-7 dark:invert"/>
				<h1 className="text-3xl font-bold">
					Applyr
				</h1>
			</div>

			<div className="divider my-0" />

			{/* Navigation */}
			<ul className="menu w-full p-4">
				<li>
					<NavLink to="/" className={({ isActive }) => (isActive ? "menu-active" : "")}>
						<LayoutDashboard size={20} />
						Dashboard
					</NavLink>
				</li>

				<li>
					<NavLink to="/applications" className={({ isActive }) => (isActive ? "menu-active" : "")}>
						<BriefcaseBusiness size={20} />
						Applications
					</NavLink>
				</li>
			</ul>

			{/* User */}
			<div className="mt-auto">
				<div className="divider my-0" />

				{/* User menu */}
				<div className="dropdown dropdown-top w-full p-4">
					<div
						tabIndex={0}
						role="button"
						className="flex items-center gap-3 w-full cursor-pointer"
					>
						<div className="avatar placeholder">
							<div className="w-10 rounded-full bg-primary text-primary-content flex justify-center items-center">
								<span className="text-xl"><strong>{user?.name[0].toUpperCase() ?? "G"}</strong></span>
							</div>
						</div>

						<div className="flex-1 text-left">
							<p className="font-medium">
								{user?.name ?? "Guest"}
							</p>
						</div>

						<span>⌃</span>
					</div>

					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg mb-2"
					>
						<li>
							<Link to="/settings">
								<Settings size={18} />
								Settings
							</Link>
						</li>

						<li>
							<button onClick={handleLogout}>
								<LogOut size={18} />
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;