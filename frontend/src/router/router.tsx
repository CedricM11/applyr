import { createBrowserRouter } from "react-router";

import Home from '../pages/Home';
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		]
	}
])