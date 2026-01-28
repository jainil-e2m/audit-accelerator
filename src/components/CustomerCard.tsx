import { Customer, AuditResult } from '@/lib/mockData';
import { CheckCircle2, Clock, Building2, Mail, Globe } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  auditResult?: AuditResult;
  isSelected: boolean;
  onSelect: () => void;
}

export function CustomerCard({ customer, auditResult, isSelected, onSelect }: CustomerCardProps) {
  const auditLabels = [
    { key: 'seo' as const, label: 'SEO' },
    { key: 'ppc' as const, label: 'PPC' },
    { key: 'content' as const, label: 'Content' },
    { key: 'webdesign' as const, label: 'Web Design' },
  ];

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{customer.company}</h4>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            {customer.industry}
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            customer.status === 'Active'
              ? 'bg-primary/10 text-primary'
              : customer.status === 'Prospect'
              ? 'bg-accent/10 text-accent'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {customer.status}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5" />
          {customer.contactEmail}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5" />
          {customer.companyDomain}
        </div>
      </div>

      {/* Audit Status Badges */}
      {auditResult && (
        <div className="mt-4 flex flex-wrap gap-2">
          {auditLabels.map(({ key, label }) => {
            const status = auditResult.audits[key];
            if (status === 'not_started') return null;
            
            return (
              <span
                key={key}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  status === 'completed'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {status === 'completed' ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
