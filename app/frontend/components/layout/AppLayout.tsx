import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

export function AppLayout() {
	const WIDTH = 264; // Sidebarの幅と合わせる
	return (
		<div className="min-h-screen bg-white text-gray-900">
			<div className="flex">
				<Sidebar /> {/* ← open/onCloseは不要。常時表示 */}
				<main className="flex-1 min-w-0 p-4" style={{ marginLeft: WIDTH }}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
