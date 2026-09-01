import { toast } from "sonner";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router";


function Home() {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
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

	return <>
		<div>Hello {user?.name}</div>
		<div onClick={handleLogout} className="btn btn-secondary">logout</div>
	</>

}

export default Home