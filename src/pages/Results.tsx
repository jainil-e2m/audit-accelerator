import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CustomerCard } from '@/components/CustomerCard';
import { ServiceSelector } from '@/components/ServiceSelector';
import { EmailEditor } from '@/components/EmailEditor';
import { Customer, AuditResult, CustomerServiceSelection } from '@/lib/mockData';
import { generateEmail, sendEmail } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, FileText } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [customerSelections, setCustomerSelections] = useState<CustomerServiceSelection[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [emailDraft, setEmailDraft] = useState<{ to: string; subject: string; body: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const storedCustomers = sessionStorage.getItem('customers');
    const storedResults = sessionStorage.getItem('auditResults');
    const storedSelections = sessionStorage.getItem('customerSelections');
    
    if (storedCustomers && storedResults) {
      const parsedCustomers: Customer[] = JSON.parse(storedCustomers);
      const parsedResults: AuditResult[] = JSON.parse(storedResults);
      const parsedSelections: CustomerServiceSelection[] = storedSelections ? JSON.parse(storedSelections) : [];
      
      // Only show customers that have audit results
      const auditedCustomerIds = parsedResults.map(r => r.customerId);
      setCustomers(parsedCustomers.filter(c => auditedCustomerIds.includes(c.id)));
      setAuditResults(parsedResults);
      setCustomerSelections(parsedSelections);
      
      // Auto-select first customer and their services
      if (parsedResults.length > 0) {
        const firstCustomerId = parsedResults[0].customerId;
        setSelectedCustomerId(firstCustomerId);
        const firstSelection = parsedSelections.find(s => s.customerId === firstCustomerId);
        setSelectedServices(firstSelection?.selectedServices || []);
      }
    } else {
      // No data, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  const selectedAuditResult = auditResults.find(r => r.customerId === selectedCustomerId);

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShowEmailEditor(false);
    // Load the services that were selected for this customer
    const selection = customerSelections.find(s => s.customerId === customerId);
    setSelectedServices(selection?.selectedServices || []);
  };

  const handleGenerateEmail = async () => {
    if (!selectedCustomerId || selectedServices.length === 0) return;
    
    setIsGenerating(true);
    try {
      const draft = await generateEmail(
        selectedCustomerId,
        selectedServices,
        selectedAuditResult?.summary || ''
      );
      setEmailDraft(draft);
      setShowEmailEditor(true);
    } catch (error) {
      console.error('Email generation failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate email draft',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async (to: string, subject: string, body: string) => {
    setIsSending(true);
    try {
      await sendEmail(to, subject, body);
      toast({
        title: 'Email Queued (Demo)',
        description: `Email to ${to} has been queued for sending.`,
      });
      setShowEmailEditor(false);
      setEmailDraft(null);
    } catch (error) {
      console.error('Email send failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-2 -ml-3 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Audit Results</h1>
            <p className="mt-1 text-muted-foreground">
              {customers.length} customer{customers.length !== 1 ? 's' : ''} audited
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Customer List */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Select a Customer
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {customers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  auditResult={auditResults.find(r => r.customerId === customer.id)}
                  isSelected={selectedCustomerId === customer.id}
                  onSelect={() => handleCustomerSelect(customer.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {showEmailEditor && emailDraft ? (
              <EmailEditor
                to={emailDraft.to}
                initialSubject={emailDraft.subject}
                initialBody={emailDraft.body}
                onSend={handleSendEmail}
                onClose={() => {
                  setShowEmailEditor(false);
                  setEmailDraft(null);
                }}
                isSending={isSending}
              />
            ) : (
              <>
                {/* Audit Summary */}
                {selectedCustomer && selectedAuditResult && (
                  <div className="card-elevated p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        Audit Summary: {selectedCustomer.company}
                      </h3>
                    </div>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <pre className="whitespace-pre-wrap rounded-lg bg-secondary/50 p-4 text-xs leading-relaxed">
                        {selectedAuditResult.summary}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Service Selection */}
                <div className="card-elevated p-6">
                  <ServiceSelector
                    selectedServices={selectedServices}
                    onSelectionChange={setSelectedServices}
                  />
                </div>

                {/* Generate Email Button */}
                {selectedCustomer && (
                  <Button
                    onClick={handleGenerateEmail}
                    disabled={selectedServices.length === 0 || isGenerating}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    size="lg"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {isGenerating ? 'Generating...' : 'Generate Email Draft'}
                  </Button>
                )}

                {selectedServices.length === 0 && selectedCustomer && (
                  <p className="text-center text-sm text-muted-foreground">
                    Select at least one service to generate an email
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
