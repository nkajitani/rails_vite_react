import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/admin/SignIn";
import SignUp from "@/pages/admin/SignUp";
import Dashboard from "@/pages/admin/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
	{ path: "/admin/sign_in", element: <SignIn /> },
	{ path: "/admin/sign_up", element: <SignUp /> },

	{
		element: <ProtectedRoute />,
		children: [{ index: true, path: "/admin", element: <Dashboard /> }],
	},
]);
