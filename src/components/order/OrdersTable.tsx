import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
	ChevronUp,
} from "lucide-react";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { type Locale, translations } from "@/i18n/translations";
import type { Order, OrderStatus } from "@/store/orderStore";
import { OrderDetail } from "./OrderDetail";
import { OrderStatusBadge } from "./OrderStatusBadge";

type OrdersTableProps = {
	orders: Order[];
	locale: Locale;
};

const columnHelper = createColumnHelper<Order>();

const STATUS_OPTIONS: OrderStatus[] = [
	"pending",
	"confirmed",
	"shipped",
	"delivered",
	"cancelled",
];

export function OrdersTable({
	orders,
	locale = "en" as Locale,
}: OrdersTableProps) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "date", desc: true },
	]);
	const [expanded, setExpanded] = useState<Set<string>>(new Set());
	const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

	const t = translations[locale];

	const priceFormatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				style: "currency",
				currency: "USD",
			}),
		[locale],
	);

	const dateFormatter = useMemo(
		() =>
			new Intl.DateTimeFormat(locale, {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		[locale],
	);

	const filteredOrders = useMemo(() => {
		if (statusFilter === "all") return orders;
		return orders.filter((o) => o.status === statusFilter);
	}, [orders, statusFilter]);

	const toggleExpand = useCallback((id: string) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}, []);

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", {
				header: t.orders.order,
				cell: (info) => (
					<span className="font-medium">
						#{info.getValue().slice(-6).toUpperCase()}
					</span>
				),
			}),
			columnHelper.accessor("date", {
				header: t.orders.date,
				cell: (info) => dateFormatter.format(new Date(info.getValue())),
			}),
			columnHelper.accessor("status", {
				header: t.orders.status,
				cell: (info) => <OrderStatusBadge status={info.getValue()} />,
			}),
			columnHelper.accessor("items", {
				header: t.orders.items,
				cell: (info) => {
					const itemCount = info
						.getValue()
						.reduce((sum, i) => sum + i.quantity, 0);
					return (
						<span>
							{itemCount} {t.orders.items}
						</span>
					);
				},
			}),
			columnHelper.accessor("total", {
				header: t.orders.total,
				cell: (info) => (
					<span className="font-medium">
						{priceFormatter.format(info.getValue())}
					</span>
				),
			}),
			columnHelper.display({
				id: "actions",
				header: "",
				cell: (info) => (
					<button
						type="button"
						onClick={() => toggleExpand(info.row.original.id)}
						className="flex items-center gap-1 text-sm text-primary hover:underline"
					>
						{expanded.has(info.row.original.id) ? t.orders.hide : t.orders.view}
						{expanded.has(info.row.original.id) ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</button>
				),
			}),
		],
		[dateFormatter, priceFormatter, expanded, toggleExpand, t],
	);

	const table = useReactTable({
		data: filteredOrders,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: 10 } },
	});

	return (
		<div className="flex flex-col gap-4">
			{/* Status Filter */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">{t.filter.label}</span>
				<select
					value={statusFilter}
					onChange={(e) =>
						setStatusFilter(e.target.value as OrderStatus | "all")
					}
					className="rounded-md border px-3 py-1.5 text-sm"
				>
					<option value="all">{t.orders.filterAll}</option>
					{STATUS_OPTIONS.map((s) => (
						<option key={s} value={s}>
							{s.charAt(0).toUpperCase() + s.slice(1)}
						</option>
					))}
				</select>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b">
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-3 pr-4 text-left font-medium text-muted-foreground"
									>
										{header.isPlaceholder ? null : (
											<button
												type="button"
												onClick={() =>
													header.column.getToggleSortingHandler()?.(
														header.getContext(),
													)
												}
												className="flex items-center gap-1 hover:text-foreground"
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{header.column.getIsSorted() === "asc" ? (
													<ChevronUp className="h-4 w-4" />
												) : header.column.getIsSorted() === "desc" ? (
													<ChevronDown className="h-4 w-4" />
												) : (
													<ChevronsUpDown className="h-4 w-4" />
												)}
											</button>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<React.Fragment key={row.id}>
								<tr className="border-b">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="py-3 pr-4">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
								{expanded.has(row.original.id) && (
									<tr>
										<td colSpan={columns.length} className="bg-muted/30 py-4">
											<OrderDetail order={row.original} locale={locale} />
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">
					{t.pagination.page} {table.getState().pagination.pageIndex + 1}{" "}
					{t.pagination.of} {table.getPageCount()}
				</span>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
					>
						<ChevronLeft className="mr-1 h-4 w-4 inline" />
						{t.pagination.prev}
					</button>
					<button
						type="button"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
					>
						{t.pagination.next}
						<ChevronRight className="ml-1 h-4 w-4 inline" />
					</button>
				</div>
			</div>
		</div>
	);
}
