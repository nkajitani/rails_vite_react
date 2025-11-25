export type NavItem =
	| {
			type: "link";
			label: string;
			to?: string;
	  }
	| {
			type: "group";
			label: string;
			children: {
				type: string;
				label: string;
				to?: string;
				children?: NavItem[];
			}[];
	  }
	| { type: "heading"; label: string };

export const nav: NavItem[] = [
	{ type: "heading", label: "管理" },
	{
		type: "group",
		label: "在庫管理",
		children: [
			{
				type: "link",
				label: "在庫照会（仏壇：金・唐木・静岡）",
				to: "/inv/inquiry/butsudan",
			},
			{
				type: "link",
				label: "在庫照会（仏具）",
				to: "/inv/inquiry/butsugu",
			},
			{ type: "link", label: "画像在庫", to: "/inv/image-stock" },
			{
				type: "link",
				label: "在庫取分照会（メーカー別）",
				to: "/inv/allocations",
			},
			{
				type: "link",
				label: "棚卸（仏壇）",
				to: "/inv/stocktake/butsudan",
			},
		],
	},
	{
		type: "group",
		label: "出荷入荷管理",
		children: [
			{ type: "link", label: "出荷照会", to: "/logi/shipments" },
			{ type: "link", label: "入荷照会", to: "/logi/receipts" },
			{ type: "link", label: "本日出荷・荷造り登録", to: "/logi/today-pack" },
			{ type: "link", label: "出荷検品", to: "/logi/inspection" },
			{ type: "link", label: "入庫整理", to: "/logi/putaway" },
			{ type: "link", label: "バーコードチェック", to: "/logi/barcode-check" },
		],
	},
	{
		type: "group",
		label: "受注管理",
		children: [
			{ type: "link", label: "得意先照会", to: "/orders/customers" },
			{ type: "link", label: "受注照会", to: "/orders" },
			{ type: "link", label: "積込予定作成", to: "/orders/loading-plan" },
			{ type: "link", label: "得意先用携帯在庫", to: "/orders/mobile-stock" },
		],
	},
	{
		type: "group",
		label: "仕入調達管理",
		children: [
			{ type: "link", label: "仕入先照会", to: "/proc/vendors" },
			{ type: "link", label: "来社予定", to: "/proc/visits" },
			{
				type: "link",
				label: "仕入価格改定・仏壇価格",
				to: "/proc/price-revision",
			},
		],
	},
	{
		type: "group",
		label: "生産管理",
		children: [
			{ type: "link", label: "生産計画表", to: "/mfg/plan" },
			{ type: "link", label: "生産関係", to: "/mfg" },
		],
	},

	{
		type: "group",
		label: "価格契約管理",
		children: [
			{
				type: "link",
				label: "契約単価（商品別）照会",
				to: "/price/contracts/by-item",
			},
			{
				type: "link",
				label: "契約単価一覧・セット登録",
				to: "/price/contracts/set",
			},
		],
	},

	{
		type: "group",
		label: "会計債権債務管理",
		children: [
			{
				type: "link",
				label: "売掛金集計照会（成型事業部）",
				to: "/fin/ar/molding",
			},
			{ type: "link", label: "買掛金集計照会", to: "/fin/ap" },
		],
	},

	{
		type: "group",
		label: "品質仕様管理",
		children: [{ type: "link", label: "品質表示（登録仕様）", to: "/qa/spec" }],
	},

	{
		type: "group",
		label: "画像資料管理",
		children: [
			{ type: "link", label: "画像検索（林・A9・PDF）", to: "/assets/search" },
			{ type: "link", label: "各種説明・受注入力説明", to: "/assets/manuals" },
			{ type: "link", label: "各種一覧表", to: "/assets/lists" },
		],
	},

	{
		type: "group",
		label: "文書通信管理",
		children: [
			{ type: "link", label: "本支店便メール", to: "/comm/branch-mail" },
			{ type: "link", label: "メール管理", to: "/comm/mail" },
			{ type: "link", label: "efax管理", to: "/comm/efax" },
			{ type: "link", label: "掲示板", to: "/comm/bbs" },
		],
	},

	{
		type: "group",
		label: "スケジュール行程管理",
		children: [
			{ type: "link", label: "積込 関係", to: "/sched/loading" },
			{ type: "link", label: "営業出張一覧", to: "/sched/trips" },
			{ type: "link", label: "シフト", to: "/sched/shifts" },
			{ type: "link", label: "会議打合せ", to: "/sched/meetings" },
			{ type: "link", label: "出張案内", to: "/sched/travel-info" },
		],
	},

	{
		type: "group",
		label: "イントラネット運用管理",
		children: [
			{ type: "link", label: "新イントラネット・本社", to: "/intra/hq" },
			{ type: "link", label: "名古屋イントラ名", to: "/intra/nagoya" },
			{ type: "link", label: "直販イントラネット", to: "/intra/direct" },
		],
	},

	{
		type: "group",
		label: "問合せ・EC管理",
		children: [
			{ type: "link", label: "ホームページ問合せ一覧", to: "/ec/inquiries" },
			{ type: "link", label: "ショップ", to: "/ec/shop" },
			{ type: "link", label: "ショップ（デモ）", to: "/ec/shop-demo" },
		],
	},

	{
		type: "group",
		label: "販促展示会管理",
		children: [
			{ type: "link", label: "販促・特売", to: "/promo/sales" },
			{ type: "link", label: "展示会来場状況", to: "/promo/expo/visitors" },
			{ type: "link", label: "展示会関連", to: "/promo/expo" },
		],
	},

	{
		type: "group",
		label: "修理保守管理",
		children: [
			{ type: "link", label: "修理台帳（徳島）", to: "/svc/ledger/tokushima" },
			{
				type: "link",
				label: "修理台帳（本社仏壇）",
				to: "/svc/ledger/hq-butsudan",
			},
			{ type: "link", label: "修理台帳（仏具）", to: "/svc/ledger/butsugu" },
			{ type: "link", label: "修理台帳（名古屋）", to: "/svc/ledger/nagoya" },
		],
	},

	{
		type: "group",
		label: "機器バーコード管理",
		children: [
			{
				type: "link",
				label: "バーコード関係・スキャナ設定",
				to: "/dev/barcode/scanner",
			},
			{ type: "link", label: "バーコードチェック", to: "/dev/barcode/check" },
		],
	},

	{
		type: "group",
		label: "分析レポート管理",
		children: [
			{ type: "link", label: "ぶりお分析", to: "/bi/burio" },
			{ type: "link", label: "各種集計", to: "/bi/aggregates" },
		],
	},

	{
		type: "group",
		label: "設備監視管理",
		children: [{ type: "link", label: "太陽光監視", to: "/ops/solar" }],
	},

	// 任意: 運用・共通
	{ type: "heading", label: "運用" },
	{ type: "link", label: "ダッシュボード", to: "/admin" },
];
