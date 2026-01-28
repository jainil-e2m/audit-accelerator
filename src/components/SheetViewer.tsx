import { useState, useMemo } from 'react';
import { Customer, services, CustomerServiceSelection } from '@/lib/mockData';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, Edit2, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SheetViewerProps {
  data: Customer[];
  customerSelections: CustomerServiceSelection[];
  onSelectionChange: (selections: CustomerServiceSelection[]) => void;
  onNotesChange: (customerId: string, notes: string) => void;
}

type SortField = keyof Customer;
type SortDirection = 'asc' | 'desc';

const ROWS_PER_PAGE = 10;

// Services that map to audits (for the "Services to Promote" selection)
const promotableServices = services.filter(s => s.auditId !== null);

export function SheetViewer({ data, customerSelections, onSelectionChange, onNotesChange }: SheetViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('company');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Get selected customer IDs
  const selectedIds = customerSelections.map(s => s.customerId);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (row) =>
          row.company.toLowerCase().includes(query) ||
          row.contactName.toLowerCase().includes(query) ||
          row.contactEmail.toLowerCase().includes(query) ||
          row.industry.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const aStr = Array.isArray(aVal) ? aVal.join(',') : String(aVal);
      const bStr = Array.isArray(bVal) ? bVal.join(',') : String(bVal);
      const comparison = aStr.localeCompare(bStr);
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

  const toggleRowSelection = (customerId: string) => {
    const existing = customerSelections.find(s => s.customerId === customerId);
    if (existing) {
      // Remove from selection
      onSelectionChange(customerSelections.filter(s => s.customerId !== customerId));
    } else {
      // Add to selection with empty services
      onSelectionChange([...customerSelections, { customerId, selectedServices: [] }]);
    }
  };

  const toggleServiceForCustomer = (customerId: string, serviceId: string) => {
    const existing = customerSelections.find(s => s.customerId === customerId);
    if (!existing) {
      // Customer not selected, select them with this service
      onSelectionChange([...customerSelections, { customerId, selectedServices: [serviceId] }]);
    } else {
      const hasService = existing.selectedServices.includes(serviceId);
      const newServices = hasService
        ? existing.selectedServices.filter(s => s !== serviceId)
        : [...existing.selectedServices, serviceId];
      
      onSelectionChange(
        customerSelections.map(s =>
          s.customerId === customerId
            ? { ...s, selectedServices: newServices }
            : s
        )
      );
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === processedData.length) {
      onSelectionChange([]);
    } else {
      const existingMap = new Map(customerSelections.map(s => [s.customerId, s.selectedServices]));
      onSelectionChange(
        processedData.map(r => ({
          customerId: r.id,
          selectedServices: existingMap.get(r.id) || []
        }))
      );
    }
  };

  const getSelectedServicesForCustomer = (customerId: string): string[] => {
    return customerSelections.find(s => s.customerId === customerId)?.selectedServices || [];
  };

  const startEditingNotes = (customerId: string, currentNotes: string) => {
    setEditingNotesId(customerId);
    setTempNotes(currentNotes);
  };

  const saveNotes = (customerId: string) => {
    onNotesChange(customerId, tempNotes);
    setEditingNotesId(null);
    setTempNotes('');
  };

  const cancelEditingNotes = () => {
    setEditingNotesId(null);
    setTempNotes('');
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const columns: { field: SortField; label: string; width?: string }[] = [
    { field: 'company', label: 'Company' },
    { field: 'contactName', label: 'Contact' },
    { field: 'contactEmail', label: 'Contact Email' },
    { field: 'companyDomain', label: 'Domain' },
    { field: 'location', label: 'Location' },
    { field: 'industry', label: 'Industry' },
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
                  className="cursor-pointer px-4 py-3 text-left text-sm font-medium whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-sm font-medium">Services to Promote</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              const customerServices = getSelectedServicesForCustomer(row.id);
              
              return (
                <tr
                  key={row.id}
                  className={`border-b transition-colors hover:bg-secondary/50 ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                      aria-label={`Select ${row.company}`}
                    />
                  </td>
                  <td className="table-cell font-medium">{row.company}</td>
                  <td className="table-cell">{row.contactName}</td>
                  <td className="table-cell">{row.contactEmail}</td>
                  <td className="table-cell">{row.companyDomain}</td>
                  <td className="table-cell">{row.location}</td>
                  <td className="table-cell">{row.industry}</td>
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
                  {/* Services to Promote */}
                  <td className="px-4 py-3 min-w-[200px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-auto min-h-[32px] w-full justify-start text-left font-normal"
                        >
                          {customerServices.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {customerServices.map(serviceId => {
                                const service = promotableServices.find(s => s.id === serviceId);
                                return service ? (
                                  <Badge key={serviceId} variant="secondary" className="text-xs">
                                    {service.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Select services...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-2" align="start">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                            Select services to promote (generates corresponding audits)
                          </p>
                          {promotableServices.map(service => (
                            <label
                              key={service.id}
                              className={`flex items-start gap-2 rounded-md p-2 cursor-pointer hover:bg-secondary/50 ${
                                customerServices.includes(service.id) ? 'bg-primary/5' : ''
                              }`}
                            >
                              <Checkbox
                                checked={customerServices.includes(service.id)}
                                onCheckedChange={() => {
                                  toggleServiceForCustomer(row.id, service.id);
                                }}
                                className="mt-0.5"
                              />
                              <div>
                                <span className="text-sm font-medium">{service.name}</span>
                                <p className="text-xs text-muted-foreground">{service.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  {/* Notes */}
                  <td className="px-4 py-3 min-w-[200px]">
                    {editingNotesId === row.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          className="h-8 text-sm"
                          placeholder="Add notes..."
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => saveNotes(row.id)}>
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={cancelEditingNotes}>
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => startEditingNotes(row.id, row.notes)}
                      >
                        <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {row.notes || 'Click to add notes...'}
                        </span>
                        <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
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
