export const cases = [
  { id: 'C-001', title: 'Henderson v. Morrison Corp', client: 'Robert Henderson', type: 'Litigation', status: 'Active', attorney: 'Sarah Chen', opened: '2024-01-15', value: 85000, description: 'Corporate dispute regarding breach of contract' },
  { id: 'C-002', title: 'Patel Estate Planning', client: 'Anita Patel', type: 'Estate', status: 'Active', attorney: 'James Miller', opened: '2024-02-03', value: 12000, description: 'Comprehensive estate planning and trust setup' },
  { id: 'C-003', title: 'TechStart Inc. Acquisition', client: 'TechStart Inc.', type: 'Corporate', status: 'Active', attorney: 'Sarah Chen', opened: '2024-02-20', value: 250000, description: 'M&A advisory for company acquisition' },
  { id: 'C-004', title: 'Williams Divorce Proceedings', client: 'Diana Williams', type: 'Family', status: 'Pending', attorney: 'Marcus Thompson', opened: '2024-03-01', value: 18000, description: 'Dissolution of marriage and asset division' },
  { id: 'C-005', title: 'Greenfield Property Purchase', client: 'Greenfield LLC', type: 'Real Estate', status: 'Active', attorney: 'James Miller', opened: '2024-03-10', value: 45000, description: 'Commercial property acquisition downtown' },
  { id: 'C-006', title: 'Baker IP Infringement', client: 'Baker Industries', type: 'Litigation', status: 'Active', attorney: 'Sarah Chen', opened: '2024-03-15', value: 120000, description: 'Patent infringement claim against competitor' },
  { id: 'C-007', title: 'Martinez Immigration', client: 'Carlos Martinez', type: 'Immigration', status: 'Closed', attorney: 'Marcus Thompson', opened: '2023-11-05', value: 8500, description: 'Work visa application and processing' },
  { id: 'C-008', title: 'Summit Corp Compliance', client: 'Summit Corp', type: 'Corporate', status: 'Pending', attorney: 'Sarah Chen', opened: '2024-03-20', value: 35000, description: 'Regulatory compliance review and advisory' },
  { id: 'C-009', title: 'Johnson Personal Injury', client: 'Mark Johnson', type: 'Litigation', status: 'Active', attorney: 'James Miller', opened: '2024-01-28', value: 95000, description: 'Personal injury claim from workplace accident' },
  { id: 'C-010', title: 'Rivera Business Formation', client: 'Elena Rivera', type: 'Corporate', status: 'Closed', attorney: 'Marcus Thompson', opened: '2023-12-10', value: 6500, description: 'LLC formation and operating agreement' },
]

export const clients = [
  { id: 'CL-001', name: 'Robert Henderson', type: 'Individual', email: 'r.henderson@email.com', phone: '(555) 234-5678', cases: 2, since: '2023-06-15', status: 'Active' },
  { id: 'CL-002', name: 'Anita Patel', type: 'Individual', email: 'apatel@email.com', phone: '(555) 345-6789', cases: 1, since: '2024-02-03', status: 'Active' },
  { id: 'CL-003', name: 'TechStart Inc.', type: 'Corporate', email: 'legal@techstart.com', phone: '(555) 456-7890', cases: 3, since: '2023-03-20', status: 'Active' },
  { id: 'CL-004', name: 'Diana Williams', type: 'Individual', email: 'd.williams@email.com', phone: '(555) 567-8901', cases: 1, since: '2024-03-01', status: 'Active' },
  { id: 'CL-005', name: 'Greenfield LLC', type: 'Corporate', email: 'admin@greenfield.com', phone: '(555) 678-9012', cases: 2, since: '2023-08-15', status: 'Active' },
  { id: 'CL-006', name: 'Baker Industries', type: 'Corporate', email: 'legal@bakerinc.com', phone: '(555) 789-0123', cases: 1, since: '2024-03-15', status: 'Active' },
  { id: 'CL-007', name: 'Carlos Martinez', type: 'Individual', email: 'cmartinez@email.com', phone: '(555) 890-1234', cases: 1, since: '2023-11-05', status: 'Inactive' },
  { id: 'CL-008', name: 'Summit Corp', type: 'Corporate', email: 'legal@summitcorp.com', phone: '(555) 901-2345', cases: 1, since: '2024-03-20', status: 'Active' },
  { id: 'CL-009', name: 'Mark Johnson', type: 'Individual', email: 'm.johnson@email.com', phone: '(555) 012-3456', cases: 1, since: '2024-01-28', status: 'Active' },
  { id: 'CL-010', name: 'Elena Rivera', type: 'Individual', email: 'erivera@email.com', phone: '(555) 123-4567', cases: 1, since: '2023-12-10', status: 'Inactive' },
]

export const documents = [
  { id: 'D-001', name: 'Henderson_Complaint.pdf', case: 'C-001', type: 'Pleading', uploaded: '2024-01-20', size: '2.4 MB', attorney: 'Sarah Chen', status: 'Final' },
  { id: 'D-002', name: 'Patel_Will_Draft_v2.docx', case: 'C-002', type: 'Will', uploaded: '2024-02-10', size: '856 KB', attorney: 'James Miller', status: 'Draft' },
  { id: 'D-003', name: 'TechStart_APA_v3.pdf', case: 'C-003', type: 'Agreement', uploaded: '2024-02-25', size: '4.1 MB', attorney: 'Sarah Chen', status: 'Review' },
  { id: 'D-004', name: 'Williams_Petition.pdf', case: 'C-004', type: 'Pleading', uploaded: '2024-03-05', size: '1.2 MB', attorney: 'Marcus Thompson', status: 'Final' },
  { id: 'D-005', name: 'Greenfield_Purchase_Agreement.pdf', case: 'C-005', type: 'Agreement', uploaded: '2024-03-12', size: '3.8 MB', attorney: 'James Miller', status: 'Review' },
  { id: 'D-006', name: 'Baker_IP_Evidence.zip', case: 'C-006', type: 'Evidence', uploaded: '2024-03-18', size: '15.2 MB', attorney: 'Sarah Chen', status: 'Final' },
  { id: 'D-007', name: 'Martinez_I140_Form.pdf', case: 'C-007', type: 'Filing', uploaded: '2023-11-10', size: '980 KB', attorney: 'Marcus Thompson', status: 'Final' },
  { id: 'D-008', name: 'Summit_Compliance_Report.docx', case: 'C-008', type: 'Report', uploaded: '2024-03-22', size: '2.1 MB', attorney: 'Sarah Chen', status: 'Draft' },
  { id: 'D-009', name: 'Johnson_Medical_Records.pdf', case: 'C-009', type: 'Evidence', uploaded: '2024-02-01', size: '8.5 MB', attorney: 'James Miller', status: 'Final' },
  { id: 'D-010', name: 'Rivera_LLC_Operating_Agreement.pdf', case: 'C-010', type: 'Agreement', uploaded: '2023-12-15', size: '1.5 MB', attorney: 'Marcus Thompson', status: 'Final' },
]

export const billingEntries = [
  { id: 'B-001', date: '2024-03-20', client: 'Robert Henderson', case: 'C-001', description: 'Deposition preparation', hours: 3.5, rate: 450, amount: 1575, status: 'Paid', attorney: 'Sarah Chen' },
  { id: 'B-002', date: '2024-03-20', client: 'TechStart Inc.', case: 'C-003', description: 'Due diligence review', hours: 6.0, rate: 450, amount: 2700, status: 'Pending', attorney: 'Sarah Chen' },
  { id: 'B-003', date: '2024-03-19', client: 'Greenfield LLC', case: 'C-005', description: 'Title search and review', hours: 2.5, rate: 400, amount: 1000, status: 'Paid', attorney: 'James Miller' },
  { id: 'B-004', date: '2024-03-19', client: 'Diana Williams', case: 'C-004', description: 'Client consultation', hours: 1.5, rate: 350, amount: 525, status: 'Pending', attorney: 'Marcus Thompson' },
  { id: 'B-005', date: '2024-03-18', client: 'Baker Industries', case: 'C-006', description: 'Patent research', hours: 4.0, rate: 450, amount: 1800, status: 'Paid', attorney: 'Sarah Chen' },
  { id: 'B-006', date: '2024-03-18', client: 'Mark Johnson', case: 'C-009', description: 'Witness interviews', hours: 5.5, rate: 400, amount: 2200, status: 'Overdue', attorney: 'James Miller' },
  { id: 'B-007', date: '2024-03-17', client: 'Summit Corp', case: 'C-008', description: 'Regulatory analysis', hours: 3.0, rate: 450, amount: 1350, status: 'Pending', attorney: 'Sarah Chen' },
  { id: 'B-008', date: '2024-03-17', client: 'Anita Patel', case: 'C-002', description: 'Trust document review', hours: 2.0, rate: 400, amount: 800, status: 'Paid', attorney: 'James Miller' },
  { id: 'B-009', date: '2024-03-16', client: 'TechStart Inc.', case: 'C-003', description: 'Negotiation session', hours: 4.5, rate: 450, amount: 2025, status: 'Pending', attorney: 'Sarah Chen' },
  { id: 'B-010', date: '2024-03-15', client: 'Robert Henderson', case: 'C-001', description: 'Court filing preparation', hours: 2.5, rate: 450, amount: 1125, status: 'Paid', attorney: 'Sarah Chen' },
]

export const monthlyRevenue = [
  { month: 'Oct', revenue: 42000 },
  { month: 'Nov', revenue: 51000 },
  { month: 'Dec', revenue: 38000 },
  { month: 'Jan', revenue: 55000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 48100 },
]

export const casesByStatus = [
  { name: 'Active', value: 6, color: '#7c3aed' },
  { name: 'Pending', value: 2, color: '#3b82f6' },
  { name: 'Closed', value: 2, color: '#10b981' },
]

export const upcomingDeadlines = [
  { id: 1, case: 'Henderson v. Morrison Corp', task: 'File response to motion', date: '2024-03-25', priority: 'High' },
  { id: 2, case: 'TechStart Inc. Acquisition', task: 'Submit revised APA', date: '2024-03-27', priority: 'High' },
  { id: 3, case: 'Williams Divorce Proceedings', task: 'Asset disclosure deadline', date: '2024-03-28', priority: 'Medium' },
  { id: 4, case: 'Baker IP Infringement', task: 'Discovery response due', date: '2024-04-01', priority: 'High' },
  { id: 5, case: 'Summit Corp Compliance', task: 'Compliance report delivery', date: '2024-04-03', priority: 'Medium' },
]
