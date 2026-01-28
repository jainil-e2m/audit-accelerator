import { auditTypes } from '@/lib/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, TrendingUp, Share2, FileText } from 'lucide-react';

interface AuditSelectorProps {
  selectedAudits: string[];
  onSelectionChange: (audits: string[]) => void;
}

const auditIcons: Record<string, React.ReactNode> = {
  seo: <Search className="h-5 w-5" />,
  ppc: <TrendingUp className="h-5 w-5" />,
  social: <Share2 className="h-5 w-5" />,
  content: <FileText className="h-5 w-5" />,
};

export function AuditSelector({ selectedAudits, onSelectionChange }: AuditSelectorProps) {
  const toggleAudit = (auditId: string) => {
    if (selectedAudits.includes(auditId)) {
      onSelectionChange(selectedAudits.filter((id) => id !== auditId));
    } else {
      onSelectionChange([...selectedAudits, auditId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(auditTypes.map((a) => a.id));
  };

  return (
    <div className="card-elevated p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Select Audits to Run</h3>
        <button
          onClick={selectAll}
          className="text-sm text-primary hover:underline"
        >
          Select All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {auditTypes.map((audit) => (
          <label
            key={audit.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${
              selectedAudits.includes(audit.id)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Checkbox
              checked={selectedAudits.includes(audit.id)}
              onCheckedChange={() => toggleAudit(audit.id)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-primary">{auditIcons[audit.id]}</span>
                <span className="font-medium text-foreground">{audit.name}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{audit.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
