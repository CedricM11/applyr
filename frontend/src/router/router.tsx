import { createBrowserRouter } from "react-router";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../components/dashboard/Dashboard";

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
				element: <AppLayout />,
				children: [
					{
						path: '/',
						element: <Dashboard />
					},
				]
			},
		]
	}
])