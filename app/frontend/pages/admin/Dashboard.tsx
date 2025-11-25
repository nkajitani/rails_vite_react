import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { StatCard } from "../../components/ui/StatCard";
import { Alert } from "../../components/ui/Alert";
import { SubmitButton } from "../../components/ui/SubmitButton";

type Kpis = {
	totalUsers: number;
	dailyActive: number;
	mrr: number; // monthly recurring revenue
	conversion: number; // %
};

type Signup = {
	id: string;
	email: string;
	name: string;
	joinedAt: string; // ISO
};

type Activity = {
	id: string;
	title: string;
	time: string; // e.g. '2h ago'
};

export default function Dashboard() {
	const [kpis, setKpis] = useState<Kpis | null>(null);
	const [signups, setSignups] = useState<Signup[] | null>(null);
	const [activity, setActivity] = useState<Activity[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let alive = true;
		(async () => {
			try {
				setLoading(true);
				const [k, s, a] = await Promise.all([
					fetchKpis(),
					fetchRecentSignups(),
					fetchActivity(),
				]);
				if (!alive) return;
				setKpis(k);
				setSignups(s);
				setActivity(a);
				setError(null);
			} catch (e) {
				if (!alive) return;
				setError(
					"ダッシュボードデータの取得に失敗しました。時間をおいて再度お試しください。",
				);
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);

	const conversionText = useMemo(() => {
		return kpis ? `${kpis.conversion.toFixed(1)}%` : "--";
	}, [kpis]);

	return (
		<div className="space-y-6">
			<header className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">Dashboard</h1>
					<p className="text-sm text-gray-500">
						ようこそ。主要KPIと最近の動きを確認できます。
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Link to="/admin/transactions">
						<SubmitButton as="span" variant="secondary">
							取引一覧へ
						</SubmitButton>
					</Link>
					<Link to="/admin">
						<SubmitButton as="span">最新に更新</SubmitButton>
					</Link>
				</div>
			</header>

			{error && <Alert intent="error" message={error} />}

			{/* KPI cards */}
			<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				<StatCard
					title="Total Users"
					value={
						loading || !kpis ? (
							<Skeleton w={96} />
						) : (
							kpis.totalUsers.toLocaleString()
						)
					}
					trend="+2.1% WoW"
					icon="groups"
				/>
				<StatCard
					title="Daily Active"
					value={
						loading || !kpis ? (
							<Skeleton w={80} />
						) : (
							kpis.dailyActive.toLocaleString()
						)
					}
					trend="+0.8% DoD"
					icon="bolt"
				/>
				<StatCard
					title="MRR"
					value={
						loading || !kpis ? (
							<Skeleton w={72} />
						) : (
							`$${kpis.mrr.toLocaleString()}`
						)
					}
					trend="+3.4% MoM"
					icon="paid"
				/>
				<StatCard
					title="Conversion"
					value={loading || !kpis ? <Skeleton w={64} /> : conversionText}
					trend="Last 7 days"
					icon="trending_up"
				/>
			</section>

			<div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
				{/* 最近のサインアップ */}
				<section className="2xl:col-span-2 bg-white rounded-lg border border-black/5">
					<div className="px-4 py-3 border-b border-black/5 flex items-center justify-between">
						<h2 className="text-sm font-semibold">Recent Signups</h2>
						<Link
							to="/admin/users"
							className="text-sm text-indigo-600 hover:underline"
						>
							すべて見る
						</Link>
					</div>
					<div className="p-4 overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="text-gray-500">
								<tr className="text-left border-b border-black/5">
									<th className="py-2 pr-4">Name</th>
									<th className="py-2 pr-4">Email</th>
									<th className="py-2 pr-4">Joined</th>
								</tr>
							</thead>
							<tbody>
								{loading &&
									[...Array(5)].map((_, i) => (
										<tr key={i} className="border-b border-black/5">
											<td className="py-3 pr-4">
												<Skeleton w={120} />
											</td>
											<td className="py-3 pr-4">
												<Skeleton w={180} />
											</td>
											<td className="py-3 pr-4">
												<Skeleton w={96} />
											</td>
										</tr>
									))}
								{!loading && signups?.length === 0 && (
									<tr>
										<td colSpan={3} className="py-6 text-center text-gray-500">
											まだサインアップはありません
										</td>
									</tr>
								)}
								{!loading &&
									signups?.map((s) => (
										<tr key={s.id} className="border-b border-black/5">
											<td className="py-3 pr-4 font-medium">{s.name}</td>
											<td className="py-3 pr-4 text-gray-600">{s.email}</td>
											<td className="py-3 pr-4 text-gray-600">
												{new Date(s.joinedAt).toLocaleDateString()}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</section>

				{/* アクティビティ */}
				<section className="bg-white rounded-lg border border-black/5">
					<div className="px-4 py-3 border-b border-black/5">
						<h2 className="text-sm font-semibold">Activity</h2>
					</div>
					<ul className="p-4 space-y-3">
						{loading &&
							[...Array(5)].map((_, i) => (
								<li key={i} className="flex items-start gap-3">
									<Dot />
									<div className="flex-1">
										<Skeleton w={220} />
										<div className="mt-1 text-xs text-gray-400">
											<Skeleton w={64} />
										</div>
									</div>
								</li>
							))}
						{!loading &&
							activity?.map((a) => (
								<li key={a.id} className="flex items-start gap-3">
									<Dot />
									<div className="flex-1">
										<div className="text-sm">{a.title}</div>
										<div className="mt-1 text-xs text-gray-500">{a.time}</div>
									</div>
								</li>
							))}
					</ul>
				</section>
			</div>
		</div>
	);
}

/* -------------- ダミーデータ取得（後でAPI接続に差し替え） -------------- */
async function fetchKpis(): Promise<Kpis> {
	// TODO: services/apiClient から /admin/metrics 等に差し替え
	await sleep(500);
	return { totalUsers: 13820, dailyActive: 2450, mrr: 32840, conversion: 4.6 };
}
async function fetchRecentSignups(): Promise<Signup[]> {
	await sleep(500);
	return [
		{
			id: "u_1",
			email: "alice@example.com",
			name: "Alice",
			joinedAt: new Date().toISOString(),
		},
		{
			id: "u_2",
			email: "bob@example.com",
			name: "Bob",
			joinedAt: new Date(Date.now() - 86400000).toISOString(),
		},
		{
			id: "u_3",
			email: "carol@example.com",
			name: "Carol",
			joinedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
		},
	];
}
async function fetchActivity(): Promise<Activity[]> {
	await sleep(500);
	return [
		{
			id: "a1",
			title: "New payment succeeded ($120) by alice@example.com",
			time: "2h ago",
		},
		{ id: "a2", title: "Plan upgraded: bob@example.com → Pro", time: "5h ago" },
		{ id: "a3", title: "New signup carol@example.com", time: "1d ago" },
	];
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* -------------- ちょい便利UI -------------- */
function Skeleton({ w = 100, h = 16 }: { w?: number; h?: number }) {
	return (
		<div
			className="animate-pulse rounded bg-gray-200"
			style={{ width: w, height: h }}
		/>
	);
}
function Dot() {
	return (
		<span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
	);
}
