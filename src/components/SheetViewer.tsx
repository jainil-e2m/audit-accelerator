import { useState, useMemo } from 'react';
import { Customer } from '@/lib/mockData';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface SheetViewerProps {
  data: Customer[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

type SortField = keyof Customer;
type SortDirection = 'asc' | 'desc';

const ROWS_PER_PAGE = 10;

export function SheetViewer({ data, selectedIds, onSelectionChange }: SheetViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('companyName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (row) =>
          row.companyName.toLowerCase().includes(query) ||
          row.contactName.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query) ||
          row.industry.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [data, searchQuery, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / ROWS_PER_PAGE);
  const paginatedData = processedData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRow = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === processedData.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(processedData.map((r) => r.id));
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const columns: { field: SortField; label: string }[] = [
    { field: 'companyName', label: 'Company' },
    { field: 'contactName', label: 'Contact' },
    { field: 'email', label: 'Email' },
    { field: 'industry', label: 'Industry' },
    { field: 'location', label: 'Location' },
    { field: 'status', label: 'Status' },
  ];

  return (
    <div className="table-container">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedIds.length > 0 && (
            <span className="mr-4 font-medium text-primary">
              {selectedIds.length} selected
            </span>
          )}
          {processedData.length} customers
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header sticky top-0">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={
                    processedData.length > 0 &&
                    selectedIds.length === processedData.length
                  }
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.field}
                  onClick={() => handleSort(col.field)}
                  className="cursor-pointer px-4 py-3 text-left text-sm font-medium"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className={`border-b transition-colors hover:bg-secondary/50 ${
                  selectedIds.includes(row.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.companyName}`}
                  />
                </td>
                <td className="table-cell font-medium">{row.companyName}</td>
                <td className="table-cell">{row.contactName}</td>
                <td className="table-cell">{row.email}</td>
                <td className="table-cell">{row.industry}</td>
                <td className="table-cell">{row.location}</td>
                <td className="table-cell">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.status === 'Active'
                        ? 'bg-primary/10 text-primary'
                        : row.status === 'Prospect'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ROWS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ROWS_PER_PAGE, processedData.length)} of{' '}
            {processedData.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-md text-sm font-medium ${
                  page === currentPage
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
