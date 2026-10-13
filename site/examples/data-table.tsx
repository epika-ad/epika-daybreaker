import { Badge, DataTable } from "daybreaker";

type Invoice = {
  id: string;
  customer: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV-001", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "INV-002", customer: "Alan Turing", status: "Pending", amount: 150 },
  { id: "INV-003", customer: "Grace Hopper", status: "Overdue", amount: 350 },
  { id: "INV-004", customer: "Linus Torvalds", status: "Paid", amount: 90 },
  { id: "INV-005", customer: "Margaret Hamilton", status: "Paid", amount: 480 },
  { id: "INV-006", customer: "Dennis Ritchie", status: "Pending", amount: 220 },
  { id: "INV-007", customer: "Barbara Liskov", status: "Paid", amount: 310 },
  { id: "INV-008", customer: "Ken Thompson", status: "Overdue", amount: 75 },
];

const tones = {
  Paid: "success",
  Pending: "warning",
  Overdue: "error",
} as const;

const columns: DataTable.Column<Invoice>[] = [
  { key: "id", header: "Invoice" },
  { key: "customer", header: "Customer" },
  {
    key: "status",
    header: "Status",
    cell: (invoice) => (
      <Badge variant={tones[invoice.status]}>{invoice.status}</Badge>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (invoice) => `€${invoice.amount}`,
  },
];

export const Example = () => (
  <DataTable
    columns={columns}
    rows={invoices}
    rowKey={(invoice) => invoice.id}
    className="max-w-xl"
  />
);
