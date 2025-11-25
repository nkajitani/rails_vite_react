type Props = { onMenu: () => void };

export function Topbar({ onMenu }: Props) {
	return (
		<header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur">
			<div className="h-14 px-4 flex items-center gap-3">
				<button
					className="md:hidden p-2 rounded hover:bg-black/5"
					onClick={onMenu}
					aria-label="Open menu"
					type="button"
				>
					<span className="material-icons-round">menu</span>
				</button>
				<div className="font-semibold">My Admin</div>
			</div>
		</header>
	);
}
