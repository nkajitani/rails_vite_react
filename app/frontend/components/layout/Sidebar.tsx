import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { nav, type NavItem } from "./nav";
import { useLocalStorageState } from "./useLocalStorageState";

const WIDTH = 264;

export function Sidebar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => {
		setMobileOpen(false);
	}); // ルート遷移で閉じる

	return (
		<>
			{/* モバイル用トグル（右下FAB） */}
			<button
				className="fixed bottom-4 right-4 z-40 md:hidden rounded-full h-12 w-12 shadow-lg bg-indigo-600 text-white flex items-center justify-center"
				onClick={() => setMobileOpen(true)}
				aria-label="Open menu"
				type="button"
			>
				<span className="material-icons-round">menu</span>
			</button>

			{/* Overlay（モバイル） */}
			<button
				type="button"
				className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
					mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
				onClick={() => setMobileOpen(false)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") setMobileOpen(false);
				}}
			/>

			{/* 本体（常時固定） */}
			<aside
				className="fixed z-50 top-0 left-0 h-full bg-white/90 backdrop-blur border-r border-black/5 shadow-sm transition-transform duration-200 translate-x-0 md:translate-x-0"
				style={{ width: WIDTH }}
			>
				{/* ヘッダー */}
				<div className="h-14 px-4 flex items-center gap-2 border-b border-black/5">
					<img
						className="h-6 w-6 rounded"
						src="https://www.zuzuya.co.jp/favicon.ico"
						alt=""
					/>

					<div className="font-semibold">ずゞや 管理画面</div>
					<button
						className="ml-auto md:hidden p-2 rounded hover:bg-black/5"
						onClick={() => setMobileOpen(false)}
						aria-label="Close menu"
						type="button"
					>
						<span className="material-icons-round">close</span>
					</button>
				</div>

				{/* ナビ */}
				<nav className="p-3 h-[calc(100%-3.5rem)] overflow-y-auto">
					<ul className="space-y-1">
						{nav.map((item) => {
							const key = `${item.type}-${item.label ?? Math.random()}`;
							return (
								<Fragment key={key}>
									{item.type === "heading" && (
										<li className="mt-3 px-2 text-[11px] font-semibold tracking-wide text-gray-500/80 select-none">
											{item.label}
										</li>
									)}
									{item.type === "link" && <SidebarLink {...item} />}
									{item.type === "group" && (
										<SidebarGroup
											label={item.label}
											childrenItems={item.children}
										/>
									)}
								</Fragment>
							);
						})}
					</ul>
				</nav>
			</aside>

			{/* デスクトップのレイアウト用スペーサー（常時確保） */}
			<div className="hidden md:block" style={{ width: WIDTH }} aria-hidden />
		</>
	);
}

function SidebarLink({
	label,
	to,
}: {
	type: string;
	label: string;
	to?: string;
}) {
	return (
		<li>
			<NavLink
				to={to ?? "#"}
				className={({ isActive }) =>
					[
						"group flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-black/5",
						isActive
							? "bg-indigo-50 text-indigo-600 font-medium ring-1 ring-indigo-100"
							: "",
					].join(" ")
				}
			>
				<span className="flex-1">{label}</span>
			</NavLink>
		</li>
	);
}

function SidebarGroup({
	label,
	childrenItems,
}: {
	label: string;
	childrenItems: {
		type: string;
		label: string;
		to?: string;
		children?: NavItem[];
	}[];
}) {
	const [open, setOpen] = useLocalStorageState<boolean>(`sg:${label}`, true);
	const location = useLocation();
	// biome-ignore lint/correctness/useExhaustiveDependencies: aa
	useEffect(() => {
		if (childrenItems.some((c) => location.pathname.startsWith(c.to || ""))) {
			setOpen(true);
		}
	}, [location.pathname, childrenItems]);

	return (
		<li className="select-none">
			<button
				className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-black/5"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				type="button"
			>
				<div className="flex items-center gap-3">
					<span className="text-sm font-medium">{label}</span>
				</div>
			</button>
			<ul
				className={`mt-1 pl-9 pr-2 space-y-1 overflow-hidden transition-[grid-template-rows] grid ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
			>
				<div className="min-h-0 overflow-hidden">
					{childrenItems.map((c) => (
						<NavLink
							key={c.to}
							to={c.to || "#"}
							className={({ isActive }) =>
								[
									"mt-1 block px-3 py-2 rounded-md text-sm hover:bg-black/5",
									isActive
										? "bg-indigo-50 text-indigo-600 font-medium ring-1 ring-indigo-100"
										: "",
								].join(" ")
							}
						>
							<span className="flex items-center justify-between">
								<span>{c.label}</span>
							</span>
						</NavLink>
					))}
				</div>
			</ul>
		</li>
	);
}
