import { createBrowserRouter } from "react-router";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../components/dashboard/Dashboard";
import NewApplication from "../pages/NewApplication";
import UpdateApplication from "../pages/UpdateApplication";

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
					{
						path: '/new',
						element: <NewApplication />
					},
					{
						path: "/update/:id",
						element: <UpdateApplication />
					},
				]
			},
		]
	}
])