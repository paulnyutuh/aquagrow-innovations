import { Farmer, Investor, TeamMember, CompanyInfo, FaqItem, SuccessStory } from '../types';

const DB_KEY = 'aquaGrowDb';

interface Database {
    farmers: Farmer[];
    investors: Investor[];
    teamMembers: TeamMember[];
    companyInfo: CompanyInfo;
}

// Initial database state embedded directly into the code to prevent fetch errors on deployment.
const INITIAL_DB: Database = {
  "farmers": [
    {
      "id": "F001",
      "name": "Joseph Mutisya",
      "location": "Makueni County",
      "phone": "+254 712 345 678",
      "status": "Active",
      "joinDate": "2023-05-12"
    },
    {
      "id": "F002",
      "name": "Esther Nthenya",
      "location": "Machakos County",
      "phone": "+254 723 456 789",
      "status": "Active",
      "joinDate": "2023-06-01"
    },
    {
      "id": "F003",
      "name": "David Kimani",
      "location": "Kiambu County",
      "phone": "+254 734 567 890",
      "status": "Pending",
      "joinDate": "2024-03-10"
    },
    {
      "id": "F004",
      "name": "Grace Akinyi",
      "location": "Kisumu County",
      "phone": "+254 745 678 901",
      "status": "Rejected",
      "joinDate": "2024-02-20"
    }
  ],
  "investors": [
    {
      "id": "I001",
      "name": "Impact Capital Fund",
      "email": "contact@impactcap.com",
      "phone": "+254 756 789 012",
      "investmentAmount": 500000,
      "status": "Active"
    },
    {
      "id": "I002",
      "name": "Green Ventures LLC",
      "email": "info@greenventures.com",
      "phone": "+254 767 890 123",
      "investmentAmount": 250000,
      "status": "Active"
    },
    {
      "id": "I003",
      "name": "Angel Investor One",
      "email": "angel@email.com",
      "phone": "+254 778 901 234",
      "investmentAmount": 50000,
      "status": "Pending"
    },
    {
      "id": "I004",
      "name": "Future Growth Partners",
      "email": "hello@fgp.com",
      "phone": "+254 789 012 345",
      "investmentAmount": 750000,
      "status": "Closed"
    }
  ],
  "teamMembers": [
    {
      "id": "T001",
      "name": "Dr. Aisha Kipruto",
      "role": "Founder & CEO",
      "bio": "With a PhD in Agricultural Science and 15 years of field experience, Aisha is dedicated to bridging the gap between technology and small-scale farming.",
      "imageUrl": "https://picsum.photos/400/400?image=1"
    },
    {
      "id": "T002",
      "name": "David Odhiambo",
      "role": "Head of Operations",
      "bio": "David ensures our projects run smoothly. His expertise in logistics and community engagement is vital to our success on the ground.",
      "imageUrl": "https://picsum.photos/400/400?image=2"
    },
    {
      "id": "T003",
      "name": "Grace Wanjiku",
      "role": "Lead Agronomist",
      "bio": "Grace works hand-in-hand with our farmers, providing the training and support they need to maximize their yields and soil health.",
      "imageUrl": "https://picsum.photos/400/400?image=3"
    },
    {
      "id": "T004",
      "name": "Ben Carter",
      "role": "Director of Partnerships",
      "bio": "Ben focuses on building relationships with investors and partners who share our vision for a sustainable and prosperous future for Kenya.",
      "imageUrl": "https://picsum.photos/400/400?image=4"
    }
  ],
  "companyInfo": {
    "address": [
      "AquaGrow Innovations HQ",
      "Nairobi, Kenya"
    ],
    "phone": "+254 123 456 789",
    "email": "info@aquagrow.co.ke",
    "socials": {
      "x": "#",
      "facebook": "#",
      "linkedin": "#"
    }
  }
};


// Function to get a random image from picsum.photos to make generated content more visually appealing
const getRandomImage = (seed: string, width = 400, height = 400) => {
    // Simple hash function to get a numeric seed from a string
    const hashCode = (s: string) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
    const imageId = Math.abs(hashCode(seed)) % 1000; // Use a subset of picsum images
    return `https://picsum.photos/seed/${imageId}/${width}/${height}`;
};


const getDb = async (): Promise<Database> => {
    const dbString = localStorage.getItem(DB_KEY);

    // If localStorage is empty, use the embedded initial data.
    if (!dbString) {
        console.log("No local database found, initializing from embedded data.");
        // Deep copy to prevent mutation of the initial constant
        const initialDb = JSON.parse(JSON.stringify(INITIAL_DB));
        localStorage.setItem(DB_KEY, JSON.stringify(initialDb));
        return initialDb;
    }

    try {
        const db = JSON.parse(dbString);
        if (db && Array.isArray(db.farmers) && Array.isArray(db.investors) && Array.isArray(db.teamMembers) && db.companyInfo) {
            return db;
        } else {
            throw new Error("Data in localStorage is malformed.");
        }
    } catch (e) {
        console.error("Error reading data from localStorage. Restoring from embedded backup.", e);
        // If local storage is corrupted, reset it with the initial data.
        const initialDb = JSON.parse(JSON.stringify(INITIAL_DB));
        localStorage.setItem(DB_KEY, JSON.stringify(initialDb));
        return initialDb;
    }
};


const saveDb = (db: Database): void => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// --- Serverless function callers for dynamic public content ---

async function fetchFromFunction(functionName: string, options?: RequestInit) {
    const response = await fetch(`/.netlify/functions/${functionName}`, options);
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: 'Failed to fetch' }));
        console.error(`Error from ${functionName}:`, errorBody);
        throw new Error(`Failed to fetch from ${functionName}. Status: ${response.status}`);
    }
    return response.json();
}

export const getGeneratedTeamMembers = async (): Promise<Omit<TeamMember, 'id'>[]> => {
    const members = await fetchFromFunction('generateTeamMembers');
    return members.map((member: any) => ({
        ...member,
        imageUrl: getRandomImage(member.name)
    }));
};

export const getGeneratedSuccessStories = async (): Promise<(Omit<SuccessStory, 'farmerName'> & { name: string })[]> => {
    const stories = await fetchFromFunction('generateSuccessStories');
    return stories.map((story: any) => ({
        ...story,
        name: story.name, // Ensure the 'name' property is there for the component
        imageUrl: getRandomImage(story.name, 600, 400)
    }));
};

export const getGeneratedFaqs = async (): Promise<FaqItem[]> => {
    return fetchFromFunction('generateFaqs');
};

export const processContactInquiry = async (formData: { name: string, email: string, subject: string, message: string }) => {
    return fetchFromFunction('processContactInquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
};


// --- LocalStorage-based functions for Admin Panel CRUD ---

// Farmer Functions
export const getFarmers = async (): Promise<Farmer[]> => {
    const db = await getDb();
    return [...db.farmers];
};

export const addFarmer = async (farmerData: Omit<Farmer, 'id' | 'joinDate'>): Promise<Farmer> => {
    const db = await getDb();
    const newFarmer: Farmer = {
        ...farmerData,
        id: `F${String(Date.now()).slice(-5)}${Math.floor(Math.random()*10)}`,
        joinDate: new Date().toISOString().split('T')[0],
    };
    db.farmers.unshift(newFarmer);
    saveDb(db);
    return newFarmer;
};

export const updateFarmer = async (updatedFarmer: Farmer): Promise<Farmer> => {
    const db = await getDb();
    const index = db.farmers.findIndex(f => f.id === updatedFarmer.id);
    if (index !== -1) {
        db.farmers[index] = updatedFarmer;
        saveDb(db);
        return updatedFarmer;
    }
    throw new Error('Farmer not found');
};

export const deleteFarmer = async (farmerId: string): Promise<void> => {
    const db = await getDb();
    const initialLength = db.farmers.length;
    db.farmers = db.farmers.filter(f => f.id !== farmerId);
    if(db.farmers.length < initialLength) {
        saveDb(db);
        return;
    }
    throw new Error('Farmer not found for deletion');
};

// Investor Functions
export const getInvestors = async (): Promise<Investor[]> => {
    const db = await getDb();
    return [...db.investors];
};

export const addInvestor = async (investorData: Omit<Investor, 'id'>): Promise<Investor> => {
    const db = await getDb();
    const newInvestor: Investor = {
        ...investorData,
        id: `I${String(Date.now()).slice(-5)}${Math.floor(Math.random()*10)}`,
    };
    db.investors.unshift(newInvestor);
    saveDb(db);
    return newInvestor;
};

export const updateInvestor = async (updatedInvestor: Investor): Promise<Investor> => {
    const db = await getDb();
    const index = db.investors.findIndex(i => i.id === updatedInvestor.id);
    if (index !== -1) {
        db.investors[index] = updatedInvestor;
        saveDb(db);
        return updatedInvestor;
    }
    throw new Error('Investor not found');
};

export const deleteInvestor = async (investorId: string): Promise<void> => {
    const db = await getDb();
    const initialLength = db.investors.length;
    db.investors = db.investors.filter(i => i.id !== investorId);
    if(db.investors.length < initialLength){
        saveDb(db);
        return;
    }
    throw new Error('Investor not found for deletion');
};

// Team Member Functions (for Admin panel)
export const getTeamMembers = async (): Promise<TeamMember[]> => {
    const db = await getDb();
    return [...db.teamMembers];
};

export const addTeamMember = async (teamMemberData: Omit<TeamMember, 'id'>): Promise<TeamMember> => {
    const db = await getDb();
    const newTeamMember: TeamMember = {
        ...teamMemberData,
        id: `T${String(Date.now()).slice(-5)}${Math.floor(Math.random() * 10)}`,
    };
    db.teamMembers.unshift(newTeamMember);
    saveDb(db);
    return newTeamMember;
};

export const updateTeamMember = async (updatedTeamMember: TeamMember): Promise<TeamMember> => {
    const db = await getDb();
    const index = db.teamMembers.findIndex(t => t.id === updatedTeamMember.id);
    if (index !== -1) {
        db.teamMembers[index] = updatedTeamMember;
        saveDb(db);
        return updatedTeamMember;
    }
    throw new Error('Team member not found');
};

export const deleteTeamMember = async (teamMemberId: string): Promise<void> => {
    const db = await getDb();
    const initialLength = db.teamMembers.length;
    db.teamMembers = db.teamMembers.filter(t => t.id !== teamMemberId);
    if (db.teamMembers.length < initialLength) {
        saveDb(db);
        return;
    }
    throw new Error('Team member not found for deletion');
};

// Company Info Functions
export const getCompanyInfo = async (): Promise<CompanyInfo> => {
    const db = await getDb();
    return { ...db.companyInfo };
};

export const updateCompanyInfo = async (updatedInfo: CompanyInfo): Promise<CompanyInfo> => {
    const db = await getDb();
    db.companyInfo = updatedInfo;
    saveDb(db);
    return updatedInfo;
};