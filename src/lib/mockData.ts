// Mock customer data for demo purposes
export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  status: 'Active' | 'Prospect' | 'Lead';
  lastContact: string;
}

export interface AuditResult {
  customerId: string;
  audits: {
    seo: 'completed' | 'pending' | 'not_started';
    ppc: 'completed' | 'pending' | 'not_started';
    social: 'completed' | 'pending' | 'not_started';
    content: 'completed' | 'pending' | 'not_started';
  };
  summary?: string;
}

export const mockCustomers: Customer[] = [
  { id: '1', companyName: 'Acme Corporation', contactName: 'John Smith', email: 'john@acme.com', phone: '(555) 123-4567', website: 'acme.com', industry: 'Manufacturing', location: 'Chicago, IL', status: 'Active', lastContact: '2025-01-15' },
  { id: '2', companyName: 'TechStart Inc', contactName: 'Sarah Johnson', email: 'sarah@techstart.io', phone: '(555) 234-5678', website: 'techstart.io', industry: 'Technology', location: 'San Francisco, CA', status: 'Prospect', lastContact: '2025-01-20' },
  { id: '3', companyName: 'Green Gardens LLC', contactName: 'Mike Davis', email: 'mike@greengardens.com', phone: '(555) 345-6789', website: 'greengardens.com', industry: 'Landscaping', location: 'Austin, TX', status: 'Active', lastContact: '2025-01-18' },
  { id: '4', companyName: 'Coastal Realty', contactName: 'Jennifer Lee', email: 'jennifer@coastalrealty.com', phone: '(555) 456-7890', website: 'coastalrealty.com', industry: 'Real Estate', location: 'Miami, FL', status: 'Lead', lastContact: '2025-01-22' },
  { id: '5', companyName: 'Peak Fitness', contactName: 'Chris Brown', email: 'chris@peakfitness.com', phone: '(555) 567-8901', website: 'peakfitness.com', industry: 'Health & Fitness', location: 'Denver, CO', status: 'Active', lastContact: '2025-01-10' },
  { id: '6', companyName: 'Swift Logistics', contactName: 'Amanda Wilson', email: 'amanda@swiftlogistics.com', phone: '(555) 678-9012', website: 'swiftlogistics.com', industry: 'Transportation', location: 'Phoenix, AZ', status: 'Prospect', lastContact: '2025-01-25' },
  { id: '7', companyName: 'Bright Dental', contactName: 'Dr. Robert Chen', email: 'rchen@brightdental.com', phone: '(555) 789-0123', website: 'brightdental.com', industry: 'Healthcare', location: 'Seattle, WA', status: 'Active', lastContact: '2025-01-12' },
  { id: '8', companyName: 'Urban Eats', contactName: 'Lisa Martinez', email: 'lisa@urbaneats.com', phone: '(555) 890-1234', website: 'urbaneats.com', industry: 'Restaurant', location: 'New York, NY', status: 'Lead', lastContact: '2025-01-28' },
  { id: '9', companyName: 'Blue Sky Travel', contactName: 'David Thompson', email: 'david@blueskytravel.com', phone: '(555) 901-2345', website: 'blueskytravel.com', industry: 'Travel', location: 'Orlando, FL', status: 'Active', lastContact: '2025-01-14' },
  { id: '10', companyName: 'Modern Interiors', contactName: 'Emily White', email: 'emily@moderninteriors.com', phone: '(555) 012-3456', website: 'moderninteriors.com', industry: 'Interior Design', location: 'Los Angeles, CA', status: 'Prospect', lastContact: '2025-01-23' },
  { id: '11', companyName: 'Harbor Law Firm', contactName: 'James Miller', email: 'jmiller@harborlaw.com', phone: '(555) 111-2222', website: 'harborlaw.com', industry: 'Legal', location: 'Boston, MA', status: 'Active', lastContact: '2025-01-08' },
  { id: '12', companyName: 'Summit Financial', contactName: 'Patricia Garcia', email: 'patricia@summitfinancial.com', phone: '(555) 222-3333', website: 'summitfinancial.com', industry: 'Finance', location: 'Charlotte, NC', status: 'Lead', lastContact: '2025-01-26' },
  { id: '13', companyName: 'Paws & Claws', contactName: 'Tom Anderson', email: 'tom@pawsandclaws.com', phone: '(555) 333-4444', website: 'pawsandclaws.com', industry: 'Pet Services', location: 'Portland, OR', status: 'Active', lastContact: '2025-01-19' },
  { id: '14', companyName: 'Clean Sweep Services', contactName: 'Nancy Taylor', email: 'nancy@cleansweep.com', phone: '(555) 444-5555', website: 'cleansweep.com', industry: 'Cleaning Services', location: 'Atlanta, GA', status: 'Prospect', lastContact: '2025-01-21' },
  { id: '15', companyName: 'Valley Auto Shop', contactName: 'Kevin Moore', email: 'kevin@valleyauto.com', phone: '(555) 555-6666', website: 'valleyauto.com', industry: 'Automotive', location: 'Las Vegas, NV', status: 'Active', lastContact: '2025-01-16' },
];

export const services = [
  { id: 'website-design', name: 'Website Design', description: 'Custom responsive website design tailored to your brand' },
  { id: 'website-redesign', name: 'Website Redesign', description: 'Modernize your existing website with fresh design' },
  { id: 'seo', name: 'SEO Services', description: 'Improve search rankings and organic traffic' },
  { id: 'ppc', name: 'PPC Advertising', description: 'Google Ads and paid search campaign management' },
  { id: 'social-media', name: 'Social Media Marketing', description: 'Build your brand presence on social platforms' },
  { id: 'content-marketing', name: 'Content Marketing', description: 'Engage audiences with compelling content' },
  { id: 'email-marketing', name: 'Email Marketing', description: 'Nurture leads with targeted email campaigns' },
  { id: 'branding', name: 'Branding & Identity', description: 'Create a memorable brand identity' },
  { id: 'video-production', name: 'Video Production', description: 'Professional video content for your business' },
  { id: 'photography', name: 'Photography', description: 'High-quality photos for web and marketing' },
  { id: 'hosting', name: 'Website Hosting', description: 'Fast, secure, and reliable hosting solutions' },
  { id: 'maintenance', name: 'Website Maintenance', description: 'Keep your website updated and secure' },
];

export const auditTypes = [
  { id: 'seo', name: 'SEO Audit', description: 'Analyze search engine optimization' },
  { id: 'ppc', name: 'PPC Audit', description: 'Review paid advertising performance' },
  { id: 'social', name: 'Social Media Audit', description: 'Evaluate social media presence' },
  { id: 'content', name: 'Content Audit', description: 'Assess content quality and strategy' },
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
