import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

function AuthInitializer() {
	const initAuth = useAuthStore((state) => state.initAuth);

	useEffect(() => {
		initAuth();
	}, [initAuth])
	
	return null;
}

export default AuthInitializer