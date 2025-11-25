import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	title: string;
	value: ReactNode;
	trend?: string;
	icon?: string;
	className?: string;
};

export function StatCard({ title, value, trend, icon, className }: Props) {
	return (
		<div
			className={twMerge(
				"group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-200",
				className,
			)}
		>
			{/* Icon */}
			{icon && (
				<div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-600 transition-transform group-hover:scale-110">
					<span className="material-icons-round text-xl">{icon}</span>
				</div>
			)}

			{/* Title */}
			<div className="mb-1 text-sm font-medium text-gray-600">{title}</div>

			{/* Value */}
			<div className="mb-2 text-2xl font-bold text-gray-900">{value}</div>

			{/* Trend */}
			{trend && (
				<div className="flex items-center gap-1 text-xs text-gray-500">
					<span className="material-icons-round text-sm text-green-500">
						trending_up
					</span>
					<span>{trend}</span>
				</div>
			)}

			{/* Decorative gradient */}
			<div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
		</div>
	);
}
