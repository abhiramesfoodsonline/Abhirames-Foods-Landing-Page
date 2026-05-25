import React, { useEffect, useState, useMemo } from 'react';
import DataTable from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Download, ArrowUpDown, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { customersAPI } from '@/lib/api.ts';


interface Customer {
    customer_id: number;
    name: string;
    mobile_number: string;
    created_at: string;
}

type SortField = 'name' | 'mobile_number' | 'created_at';
type SortOrder = 'asc' | 'desc';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>('created_at');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [filterMonth, setFilterMonth] = useState<string>('all');

    const fetchCustomers = async () => {
        try {
            const res = await customersAPI.getAll();
            setCustomers(res.data);
        } catch (e) {
            toast.error('Failed to load customers.');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // ── Derived data ──────────────────────────────────────────────────────────

    const months = useMemo(() => {
        const unique = new Set(
            customers.map((c) =>
                new Date(c.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })
            )
        );
        return Array.from(unique);
    }, [customers]);

    const filtered = useMemo(() => {
        let data = [...customers];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(
                (c) =>
                    c.name?.toLowerCase().includes(q) ||
                    c.mobile_number?.includes(q)
            );
        }

        // Month filter
        if (filterMonth !== 'all') {
            data = data.filter(
                (c) =>
                    new Date(c.created_at).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                    }) === filterMonth
            );
        }

        // Sort
        data.sort((a, b) => {
            let valA = a[sortField] ?? '';
            let valB = b[sortField] ?? '';
            if (sortField === 'created_at') {
                valA = new Date(valA).getTime().toString();
                valB = new Date(valB).getTime().toString();
            }
            return sortOrder === 'asc'
                ? valA.toString().localeCompare(valB.toString())
                : valB.toString().localeCompare(valA.toString());
        });

        return data;
    }, [customers, searchQuery, sortField, sortOrder, filterMonth]);

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 ml-1 opacity-40" />;
        return sortOrder === 'asc'
            ? <ArrowUp className="h-3.5 w-3.5 ml-1 text-primary" />
            : <ArrowDown className="h-3.5 w-3.5 ml-1 text-primary" />;
    };

    // ── Exports ───────────────────────────────────────────────────────────────

    const exportCSV = () => {
        const headers = ['ID', 'Name', 'Mobile Number', 'Joined'];
        const rows = filtered.map((c) => [
            c.customer_id,
            `"${c.name}"`,                // ✅ wrap in quotes to handle commas in names
            c.mobile_number,
            new Date(c.created_at).toLocaleDateString(),
        ]);
        const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers.csv';
        document.body.appendChild(a); // ✅ must be in DOM
        a.click();
        document.body.removeChild(a); // ✅ clean up
        URL.revokeObjectURL(url);
        toast.success('Exported as CSV');
    };

    const exportExcel = async () => {
        const XLSX = await import('xlsx');
        const data = filtered.map((c) => ({
            ID: c.customer_id,
            Name: c.name,
            'Mobile Number': c.mobile_number,
            Joined: new Date(c.created_at).toLocaleDateString(),
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customers');
        XLSX.writeFile(wb, 'customers.xlsx');
        toast.success('Exported as Excel');
    };

    const exportPDF = async () => {
        const jsPDF = (await import('jspdf')).default;
        const autoTable = (await import('jspdf-autotable')).default;

        const doc = new jsPDF();
        doc.text('Customers', 14, 16);
        autoTable(doc, {
            startY: 22,
            head: [['ID', 'Name', 'Mobile Number', 'Joined']],
            body: filtered.map((c) => [
                c.customer_id,
                c.name,
                c.mobile_number,
                new Date(c.created_at).toLocaleDateString(),
            ]),
        });
        doc.save('customers.pdf');
        toast.success('Exported as PDF');
    };

    // ── Columns ───────────────────────────────────────────────────────────────

    const columns = [
        {
            header: (
                <button
                    onClick={() => toggleSort('name')}
                    className="flex items-center hover:text-foreground transition-colors"
                >
                    Name <SortIcon field="name" />
                </button>
            ),
            accessorKey: 'name' as const,
        },
        {
            header: (
                <button
                    onClick={() => toggleSort('mobile_number')}
                    className="flex items-center hover:text-foreground transition-colors"
                >
                    Mobile <SortIcon field="mobile_number" />
                </button>
            ),
            cell: (row: Customer) => (
                <span className="text-muted-foreground">{row.mobile_number}</span>
            ),
        },
        {
            header: (
                <button
                    onClick={() => toggleSort('created_at')}
                    className="flex items-center hover:text-foreground transition-colors"
                >
                    Joined <SortIcon field="created_at" />
                </button>
            ),
            cell: (row: Customer) => (
                <span className="text-muted-foreground">
                    {new Date(row.created_at).toLocaleDateString()}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Customers</h1>
                    <p className="text-muted-foreground">
                        {filtered.length} of {customers.length} customers
                    </p>
                </div>

                {/* Export */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={exportCSV}>Export as CSV</DropdownMenuItem>
                        <DropdownMenuItem onClick={exportExcel}>Export as Excel</DropdownMenuItem>
                        <DropdownMenuItem onClick={exportPDF}>Export as PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or mobile..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        {months.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filtered}
                emptyMessage="No customers found."
            />
        </div>
    );
};

export default Customers;