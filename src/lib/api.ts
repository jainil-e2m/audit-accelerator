/**
 * API Stub Functions
 * 
 * These functions simulate backend API calls for the demo.
 * In production, replace these with actual API endpoint calls.
 * 
 * Integration notes:
 * - POST /api/upload-sheet: Should accept file upload or Google Sheets URL
 * - POST /api/run-audits: Should accept customer IDs and audit types, return progress
 * - POST /api/generate-email: Should use AI/templates to generate personalized emails
 * - POST /api/send-email: Should integrate with email service (SendGrid, etc.)
 */

import { Customer, mockCustomers, AuditResult, generateMockAuditSummary, generateMockEmailDraft, getAuditsFromServices, CustomerServiceSelection } from './mockData';

// Simulated delay for realistic demo feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Upload Sheet API Stub
 * 
 * DEMO: Returns mock customer data
 * PRODUCTION: Parse uploaded CSV/XLSX or fetch from Google Sheets API
 */
export async function uploadSheet(file?: File, sheetUrl?: string): Promise<Customer[]> {
  await delay(1500);
  
  // In production, implement actual file parsing here
  // For CSV: Use PapaParse
  // For XLSX: Use xlsx library
  // For Google Sheets: Use Google Sheets API
  
  console.log('[DEMO] uploadSheet called', { file: file?.name, sheetUrl });
  
  // Return mock data for demo
  return mockCustomers;
}

/**
 * Run Audits API Stub
 * 
 * DEMO: Simulates progress and returns mock audit results
 * PRODUCTION: Trigger actual audit tools (Screaming Frog, SEMrush, etc.)
 */
export async function runAudits(
  customerServiceSelections: CustomerServiceSelection[],
  onProgress?: (progress: number, message: string) => void
): Promise<AuditResult[]> {
  // Calculate total audit steps across all customers
  let totalSteps = 0;
  const customerAudits: { customerId: string; audits: string[] }[] = [];
  
  for (const selection of customerServiceSelections) {
    const audits = getAuditsFromServices(selection.selectedServices);
    customerAudits.push({ customerId: selection.customerId, audits });
    totalSteps += audits.length;
  }
  
  if (totalSteps === 0) {
    totalSteps = 1; // Prevent division by zero
  }
  
  let completedSteps = 0;
  const results: AuditResult[] = [];
  
  for (const { customerId, audits } of customerAudits) {
    const customer = mockCustomers.find(c => c.id === customerId);
    const auditResults: AuditResult['audits'] = {
      seo: 'not_started',
      ppc: 'not_started',
      content: 'not_started',
      webdesign: 'not_started',
    };
    
    for (const auditType of audits) {
      await delay(800 + Math.random() * 400);
      completedSteps++;
      
      const progress = Math.round((completedSteps / totalSteps) * 100);
      const message = `Running ${auditType.toUpperCase()} audit for ${customer?.company || customerId}...`;
      
      onProgress?.(progress, message);
      
      // Mark audit as completed
      if (auditType === 'seo') auditResults.seo = 'completed';
      if (auditType === 'ppc') auditResults.ppc = 'completed';
      if (auditType === 'content') auditResults.content = 'completed';
      if (auditType === 'webdesign') auditResults.webdesign = 'completed';
    }
    
    results.push({
      customerId,
      audits: auditResults,
      summary: generateMockAuditSummary(customer?.company || 'Unknown'),
    });
  }
  
  return results;
}

/**
 * Generate Email API Stub
 * 
 * DEMO: Returns templated mock email
 * PRODUCTION: Use AI (GPT, Claude) or template engine for personalization
 */
export async function generateEmail(
  customerId: string,
  selectedServices: string[],
  auditSummary: string
): Promise<{ subject: string; body: string; to: string }> {
  await delay(1200);
  
  const customer = mockCustomers.find(c => c.id === customerId);
  
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  const { subject, body } = generateMockEmailDraft(
    customer.company,
    customer.contactName,
    selectedServices,
    auditSummary
  );
  
  return {
    subject,
    body,
    to: customer.contactEmail,
  };
}

/**
 * Send Email API Stub
 * 
 * DEMO: Simulates sending and returns success
 * PRODUCTION: Integrate with SendGrid, Mailgun, AWS SES, etc.
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; messageId: string }> {
  await delay(1000);
  
  console.log('[DEMO] sendEmail called', { to, subject });
  
  // In production, implement actual email sending here
  // Example: await sendgrid.send({ to, subject, html: body });
  
  return {
    success: true,
    messageId: `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}
