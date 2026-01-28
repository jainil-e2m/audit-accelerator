import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface AuditProgressProps {
  progress: number;
  message: string;
  customerCount: number;
}

export function AuditProgress({ progress, message, customerCount }: AuditProgressProps) {
  return (
    <div className="animate-slide-in fixed inset-x-0 top-[calc(var(--nav-height)+1rem)] z-40 mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-card p-4 shadow-elevated">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">
                Performing audits for {customerCount} customer{customerCount !== 1 ? 's' : ''}...
              </h4>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
            <Progress value={progress} className="mt-2 h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
