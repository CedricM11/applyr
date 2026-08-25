import { Link } from "react-router"


function Home() {
	return <>
		<div>Home</div>
		<Link to="/login" className="btn btn-secondary">login</Link>
	</>

}

export default Home