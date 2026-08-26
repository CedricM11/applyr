import { Link } from "react-router"
import { useAuthStore } from "../stores/authStore"


function Home() {
	const user = useAuthStore((state) => state.user);

	return <>
		<div>Hello {user?.name}</div>
		<Link to="/login" className="btn btn-secondary">login</Link>
	</>

}

export default Home