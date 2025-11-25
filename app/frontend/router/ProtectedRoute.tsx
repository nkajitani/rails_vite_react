import { apiClient } from "@/services/apiClient";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

export function ProtectedRoute() {
	const location = useLocation();
	const authed = apiClient.isAuthenticated();
	console.log("ProtectedRoute authed:", authed);

	if (!authed) {
		return <Navigate to="/admin/sign_in" state={{ from: location }} replace />;
	}
	return (
		<>
			<Sidebar />
			<main className="min-h-screen p-6">
				<Outlet />
			</main>
		</>
	);
}
