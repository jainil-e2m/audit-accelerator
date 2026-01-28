import { services } from '@/lib/mockData';
import { Checkbox } from '@/components/ui/checkbox';

interface ServiceSelectorProps {
  selectedServices: string[];
  onSelectionChange: (services: string[]) => void;
}

export function ServiceSelector({ selectedServices, onSelectionChange }: ServiceSelectorProps) {
  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onSelectionChange(selectedServices.filter((id) => id !== serviceId));
    } else {
      onSelectionChange([...selectedServices, serviceId]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Select Service(s) to Promote</h3>
      <div className="max-h-[400px] space-y-2 overflow-y-auto pr-2">
        {services.map((service) => (
          <label
            key={service.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all ${
              selectedServices.includes(service.id)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Checkbox
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => toggleService(service.id)}
              className="mt-0.5"
            />
            <div>
              <span className="text-sm font-medium text-foreground">{service.name}</span>
              <p className="mt-0.5 text-xs text-muted-foreground">{service.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
