import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SheetUploader } from '@/components/SheetUploader';
import { SheetViewer } from '@/components/SheetViewer';
import { AuditSelector } from '@/components/AuditSelector';
import { AuditProgress } from '@/components/AuditProgress';
import { Customer, AuditResult } from '@/lib/mockData';
import { uploadSheet, runAudits } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [selectedAudits, setSelectedAudits] = useState<string[]>([]);
  const [isRunningAudits, setIsRunningAudits] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditMessage, setAuditMessage] = useState('');

  const handleUpload = async (file?: File, sheetUrl?: string) => {
    setIsUploading(true);
    try {
      const data = await uploadSheet(file, sheetUrl);
      setCustomers(data);
      setSelectedCustomerIds([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartAudits = async () => {
    if (selectedCustomerIds.length === 0 || selectedAudits.length === 0) return;

    setIsRunningAudits(true);
    setAuditProgress(0);
    setAuditMessage('Initializing audits...');

    try {
      const results = await runAudits(
        selectedCustomerIds,
        selectedAudits,
        (progress, message) => {
          setAuditProgress(progress);
          setAuditMessage(message);
        }
      );

      // Store results and navigate
      sessionStorage.setItem('auditResults', JSON.stringify(results));
      sessionStorage.setItem('customers', JSON.stringify(customers));
      navigate('/results');
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsRunningAudits(false);
    }
  };

  const canStartAudits = selectedCustomerIds.length > 0 && selectedAudits.length > 0;

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      {/* Progress Banner */}
      {isRunningAudits && (
        <AuditProgress
          progress={auditProgress}
          message={auditMessage}
          customerCount={selectedCustomerIds.length}
        />
      )}

      {/* Hero Section */}
      {customers.length === 0 && (
        <section className="relative overflow-hidden bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="headline-hero">
                We help businesses achieve
                <br />
                success online - and yours can, too.
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
                <a href="#" className="text-foreground underline hover:text-primary">
                  Redesign with purpose
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-foreground underline hover:text-primary">
                  Increase sales with PPC
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-foreground underline hover:text-primary">
                  Analyze competitors' SEO
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="#" className="text-foreground underline hover:text-primary">
                  Transform your brand
                </a>
              </div>
              <div className="mt-10">
                <a href="#upload" className="btn-cta">
                  GET A QUOTE
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upload Section */}
      <section id="upload" className="py-12">
        <div className="container mx-auto px-4">
          {customers.length === 0 ? (
            <>
              <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
                Start by Importing Your Client Data
              </h2>
              <SheetUploader onUpload={handleUpload} isLoading={isUploading} />
            </>
          ) : (
            <div className="space-y-6">
              {/* Header with Action */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Client Master Data
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Select customers and choose audits to run
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCustomers([])}
                    className="border-border"
                  >
                    Upload New Sheet
                  </Button>
                  <Button
                    onClick={handleStartAudits}
                    disabled={!canStartAudits || isRunningAudits}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Audits for {selectedCustomerIds.length} Customer
                    {selectedCustomerIds.length !== 1 ? 's' : ''}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
                {/* Sheet Viewer */}
                <SheetViewer
                  data={customers}
                  selectedIds={selectedCustomerIds}
                  onSelectionChange={setSelectedCustomerIds}
                />

                {/* Audit Selection Panel */}
                <AuditSelector
                  selectedAudits={selectedAudits}
                  onSelectionChange={setSelectedAudits}
                />
              </div>

              {/* Validation Message */}
              {selectedCustomerIds.length > 0 && selectedAudits.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  👉 Select at least one audit type to continue
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
