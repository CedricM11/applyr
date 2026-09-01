import { useAuthStore } from "../stores/authStore";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
	const user = useAuthStore((state) => state.user);
	const isLoading = useAuthStore((state) => state.isLoading);

	if (isLoading) {
		return <div>loading...</div>
	}

	if (!user) {
		return <Navigate to="/login" replace/>
	}

	return <Outlet />
}

export default ProtectedRoute