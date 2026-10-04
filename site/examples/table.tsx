import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "woozui";

const invoices = [
  { id: "INV-001", status: "Paid", amount: "$250" },
  { id: "INV-002", status: "Pending", amount: "$150" },
  { id: "INV-003", status: "Overdue", amount: "$350" },
] as const;

export const Example = () => (
  <div className="w-72">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
