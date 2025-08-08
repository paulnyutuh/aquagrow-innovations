
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SuccessStory {
  farmerName: string;
  quote: string;
  story: string;
  imageUrl: string;
  location: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  phone?: string;
  status: 'Active' | 'Pending' | 'Rejected';
  joinDate: string;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  investmentAmount: number;
  status: 'Active' | 'Pending' | 'Closed';
}

export interface CompanyInfo {
  address: string[];
  phone: string;
  email: string;
  socials: {
    x: string;
    facebook: string;
    linkedin: string;
  };
}