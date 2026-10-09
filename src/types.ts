export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  avatar?: string;
  createdAt: string;
  lastContact: string;
}

export interface Deal {
  id: string;
  title: string;
  contactId: string;
  contactName: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  createdAt: string;
  expectedClose: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  title: string;
  description: string;
  contactId: string;
  contactName: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export type ViewType = 'dashboard' | 'contacts' | 'pipeline' | 'activities' | 'flow';
