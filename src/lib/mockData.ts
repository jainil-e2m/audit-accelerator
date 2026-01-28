// Mock customer data for demo purposes
export interface Customer {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  companyEmail: string;
  companyDomain: string;
  location: string;
  industry: string;
  pastServices: string[];
  notes: string;
  status: 'Active' | 'Prospect' | 'Lead';
}

// Service to Audit mapping
export const serviceToAuditMap: Record<string, string> = {
  'seo': 'seo',
  'ppc': 'ppc',
  'content-marketing': 'content',
  'website-design': 'webdesign',
  'website-redesign': 'webdesign',
};

// Audit types derived from services
export const auditTypes = [
  { id: 'seo', name: 'SEO Audit', description: 'Analyze search engine optimization', serviceId: 'seo' },
  { id: 'ppc', name: 'PPC Audit', description: 'Review paid advertising performance', serviceId: 'ppc' },
  { id: 'content', name: 'Content Audit', description: 'Assess content quality and strategy', serviceId: 'content-marketing' },
  { id: 'webdesign', name: 'Web Design Audit', description: 'Evaluate website design and UX', serviceId: 'website-design' },
];

export interface AuditResult {
  customerId: string;
  audits: {
    seo: 'completed' | 'pending' | 'not_started';
    ppc: 'completed' | 'pending' | 'not_started';
    content: 'completed' | 'pending' | 'not_started';
    webdesign: 'completed' | 'pending' | 'not_started';
  };
  summary?: string;
}

// Services available to promote (mapped to audits)
export const services = [
  { id: 'seo', name: 'SEO Services', description: 'Improve search rankings and organic traffic', auditId: 'seo' },
  { id: 'ppc', name: 'PPC Advertising', description: 'Google Ads and paid search campaign management', auditId: 'ppc' },
  { id: 'content-marketing', name: 'Content Marketing', description: 'Engage audiences with compelling content', auditId: 'content' },
  { id: 'website-design', name: 'Web Design', description: 'Custom responsive website design tailored to your brand', auditId: 'webdesign' },
  { id: 'website-redesign', name: 'Website Redesign', description: 'Modernize your existing website with fresh design', auditId: 'webdesign' },
  { id: 'social-media', name: 'Social Media Marketing', description: 'Build your brand presence on social platforms', auditId: null },
  { id: 'email-marketing', name: 'Email Marketing', description: 'Nurture leads with targeted email campaigns', auditId: null },
  { id: 'branding', name: 'Branding & Identity', description: 'Create a memorable brand identity', auditId: null },
  { id: 'video-production', name: 'Video Production', description: 'Professional video content for your business', auditId: null },
  { id: 'photography', name: 'Photography', description: 'High-quality photos for web and marketing', auditId: null },
  { id: 'hosting', name: 'Website Hosting', description: 'Fast, secure, and reliable hosting solutions', auditId: null },
  { id: 'maintenance', name: 'Website Maintenance', description: 'Keep your website updated and secure', auditId: null },
];

// Get unique audits from selected services
export function getAuditsFromServices(serviceIds: string[]): string[] {
  const audits = new Set<string>();
  serviceIds.forEach(serviceId => {
    const service = services.find(s => s.id === serviceId);
    if (service?.auditId) {
      audits.add(service.auditId);
    }
  });
  return Array.from(audits);
}

export const mockCustomers: Customer[] = [
  { id: '1', company: 'Acme Corporation', contactName: 'John Smith', contactEmail: 'john@acme.com', companyEmail: 'info@acme.com', companyDomain: 'acme.com', location: 'Chicago, IL', industry: 'Manufacturing', pastServices: ['seo', 'ppc'], notes: '', status: 'Active' },
  { id: '2', company: 'TechStart Inc', contactName: 'Sarah Johnson', contactEmail: 'sarah@techstart.io', companyEmail: 'hello@techstart.io', companyDomain: 'techstart.io', location: 'San Francisco, CA', industry: 'Technology', pastServices: ['website-design'], notes: '', status: 'Prospect' },
  { id: '3', company: 'Green Gardens LLC', contactName: 'Mike Davis', contactEmail: 'mike@greengardens.com', companyEmail: 'contact@greengardens.com', companyDomain: 'greengardens.com', location: 'Austin, TX', industry: 'Landscaping', pastServices: ['seo', 'content-marketing'], notes: '', status: 'Active' },
  { id: '4', company: 'Coastal Realty', contactName: 'Jennifer Lee', contactEmail: 'jennifer@coastalrealty.com', companyEmail: 'sales@coastalrealty.com', companyDomain: 'coastalrealty.com', location: 'Miami, FL', industry: 'Real Estate', pastServices: [], notes: 'New lead from website', status: 'Lead' },
  { id: '5', company: 'Peak Fitness', contactName: 'Chris Brown', contactEmail: 'chris@peakfitness.com', companyEmail: 'info@peakfitness.com', companyDomain: 'peakfitness.com', location: 'Denver, CO', industry: 'Health & Fitness', pastServices: ['social-media', 'ppc'], notes: '', status: 'Active' },
  { id: '6', company: 'Swift Logistics', contactName: 'Amanda Wilson', contactEmail: 'amanda@swiftlogistics.com', companyEmail: 'support@swiftlogistics.com', companyDomain: 'swiftlogistics.com', location: 'Phoenix, AZ', industry: 'Transportation', pastServices: ['website-redesign'], notes: '', status: 'Prospect' },
  { id: '7', company: 'Bright Dental', contactName: 'Dr. Robert Chen', contactEmail: 'rchen@brightdental.com', companyEmail: 'appointments@brightdental.com', companyDomain: 'brightdental.com', location: 'Seattle, WA', industry: 'Healthcare', pastServices: ['seo', 'website-design'], notes: 'Interested in content marketing', status: 'Active' },
  { id: '8', company: 'Urban Eats', contactName: 'Lisa Martinez', contactEmail: 'lisa@urbaneats.com', companyEmail: 'orders@urbaneats.com', companyDomain: 'urbaneats.com', location: 'New York, NY', industry: 'Restaurant', pastServices: [], notes: 'Referred by Coastal Realty', status: 'Lead' },
  { id: '9', company: 'Blue Sky Travel', contactName: 'David Thompson', contactEmail: 'david@blueskytravel.com', companyEmail: 'bookings@blueskytravel.com', companyDomain: 'blueskytravel.com', location: 'Orlando, FL', industry: 'Travel', pastServices: ['ppc', 'email-marketing'], notes: '', status: 'Active' },
  { id: '10', company: 'Modern Interiors', contactName: 'Emily White', contactEmail: 'emily@moderninteriors.com', companyEmail: 'design@moderninteriors.com', companyDomain: 'moderninteriors.com', location: 'Los Angeles, CA', industry: 'Interior Design', pastServices: ['branding', 'photography'], notes: '', status: 'Prospect' },
  { id: '11', company: 'Harbor Law Firm', contactName: 'James Miller', contactEmail: 'jmiller@harborlaw.com', companyEmail: 'legal@harborlaw.com', companyDomain: 'harborlaw.com', location: 'Boston, MA', industry: 'Legal', pastServices: ['seo', 'content-marketing'], notes: '', status: 'Active' },
  { id: '12', company: 'Summit Financial', contactName: 'Patricia Garcia', contactEmail: 'patricia@summitfinancial.com', companyEmail: 'invest@summitfinancial.com', companyDomain: 'summitfinancial.com', location: 'Charlotte, NC', industry: 'Finance', pastServices: [], notes: 'High priority lead', status: 'Lead' },
  { id: '13', company: 'Paws & Claws', contactName: 'Tom Anderson', contactEmail: 'tom@pawsandclaws.com', companyEmail: 'pets@pawsandclaws.com', companyDomain: 'pawsandclaws.com', location: 'Portland, OR', industry: 'Pet Services', pastServices: ['social-media'], notes: '', status: 'Active' },
  { id: '14', company: 'Clean Sweep Services', contactName: 'Nancy Taylor', contactEmail: 'nancy@cleansweep.com', companyEmail: 'book@cleansweep.com', companyDomain: 'cleansweep.com', location: 'Atlanta, GA', industry: 'Cleaning Services', pastServices: ['website-design', 'seo'], notes: '', status: 'Prospect' },
  { id: '15', company: 'Valley Auto Shop', contactName: 'Kevin Moore', contactEmail: 'kevin@valleyauto.com', companyEmail: 'service@valleyauto.com', companyDomain: 'valleyauto.com', location: 'Las Vegas, NV', industry: 'Automotive', pastServices: ['ppc'], notes: 'Looking for complete rebrand', status: 'Active' },
];

export const generateMockAuditSummary = (companyName: string): string => {
  const issues = [
    'Missing meta descriptions on 45% of pages',
    'Page load speed averaging 4.2 seconds (target: <2s)',
    'No SSL certificate detected',
    'Mobile responsiveness issues on product pages',
    'Low domain authority (DA: 15)',
    'Broken internal links found (12 instances)',
    'Missing alt text on images',
    'Thin content on service pages',
  ];
  
  const opportunities = [
    'Potential to rank for 150+ long-tail keywords',
    'Competitor analysis shows untapped PPC opportunities',
    'Social media engagement 60% below industry average',
    'Blog content could increase organic traffic by 40%',
  ];
  
  const randomIssues = issues.sort(() => 0.5 - Math.random()).slice(0, 3);
  const randomOpportunities = opportunities.sort(() => 0.5 - Math.random()).slice(0, 2);
  
  return `
## Audit Summary for ${companyName}

### Key Issues Identified
${randomIssues.map(i => `- ${i}`).join('\n')}

### Growth Opportunities
${randomOpportunities.map(o => `- ${o}`).join('\n')}

### Recommended Priority Actions
1. Address critical technical SEO issues
2. Implement conversion tracking
3. Develop content strategy for target keywords

*This is a demo audit summary. Actual results will vary based on comprehensive analysis.*
  `.trim();
};

export const generateMockEmailDraft = (
  customerName: string,
  contactName: string,
  selectedServices: string[],
  auditSummary: string
): { subject: string; body: string } => {
  const serviceNames = selectedServices.map(
    id => services.find(s => s.id === id)?.name || id
  ).join(', ');

  return {
    subject: `Digital Marketing Opportunity for ${customerName}`,
    body: `Dear ${contactName},

I hope this message finds you well. I recently completed an analysis of ${customerName}'s digital presence and wanted to share some findings that I believe could significantly impact your business growth.

Our audit revealed several opportunities for improvement that align perfectly with our ${serviceNames} offerings. Here's a brief overview:

${auditSummary.split('\n').slice(0, 8).join('\n')}

I'd love to schedule a brief call to discuss these findings in more detail and explore how we can help ${customerName} achieve its digital marketing goals.

Would you be available for a 15-minute call this week?

Best regards,
[Your Name]
[Your Agency]

---
*This email was generated as part of the B40 Marketing Demo. Replace with your actual content.*`
  };
};

// Customer selection with services type
export interface CustomerServiceSelection {
  customerId: string;
  selectedServices: string[];
}
