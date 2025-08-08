import { GoogleGenAI, Type } from "@google/genai";

// Assumes API_KEY is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function generateWithSchema(prompt: string, schema: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating content with schema:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
}

// Generates a list of team members for the About Us page
export const generateTeamMembers = async () => {
    const prompt = "Generate a list of 4 diverse and realistic team members for 'AquaGrow Innovations', an ag-tech startup in Kenya focused on drip irrigation for small-scale farmers. Include their full name, a plausible role (like 'Founder & CEO', 'Head of Operations', 'Lead Agronomist', 'Director of Partnerships'), and a short, compelling bio (around 20-30 words) for each.";
    
    const teamMemberSchema = {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "Full name of the team member." },
            role: { type: Type.STRING, description: "Job title or role in the company." },
            bio: { type: Type.STRING, description: "A short biography for the team member." },
        },
        required: ["name", "role", "bio"],
    };

    const schema = {
        type: Type.ARRAY,
        items: teamMemberSchema,
    };
    
    return generateWithSchema(prompt, schema);
};

// Generates success stories for the Impact page
export const generateSuccessStories = async () => {
    const prompt = "Generate 2 compelling and realistic success stories for farmers who have partnered with 'AquaGrow Innovations' in Kenya. For each story, provide the farmer's full name, their county (e.g., 'Kitui County', 'Kajiado County'), a short, impactful quote, and a brief story (around 40-50 words) detailing their transformation.";

    const storySchema = {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "The farmer's full name." },
            location: { type: Type.STRING, description: "The county where the farmer is located." },
            quote: { type: Type.STRING, description: "A short, impactful quote from the farmer." },
            story: { type: Type.STRING, description: "A brief summary of the farmer's success story." }
        },
        required: ["name", "location", "quote", "story"],
    };

    const schema = {
        type: Type.ARRAY,
        items: storySchema
    };

    return generateWithSchema(prompt, schema);
}

// Generates FAQs for the Farmers page
export const generateFaqs = async () => {
    const prompt = "Generate a list of 5 frequently asked questions (FAQs) that a small-scale farmer in Kenya might have about joining a profit-sharing drip irrigation program like 'AquaGrow Innovations'. Provide a clear question and a concise, reassuring answer for each. Cover topics like risk, profit sharing, contract length, crop choice, and land ownership.";

    const faqSchema = {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING },
        },
        required: ["question", "answer"],
    };
    
    const schema = {
        type: Type.ARRAY,
        items: faqSchema,
    };
    
    return generateWithSchema(prompt, schema);
};

// Processes a contact form inquiry
export const processContactInquiry = async (formData: { name: string, email: string, subject: string, message: string }) => {
    const prompt = `A user has submitted a contact form for AquaGrow Innovations. Analyze their message and provide a structured response. User Name: ${formData.name}, Subject: ${formData.subject}, Message: "${formData.message}". Classify the inquiry, provide a one-sentence summary, and assign a priority.`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            category: { type: Type.STRING, description: "Classify the inquiry (e.g., 'Farmer Partnership', 'Investor Relations', 'General Question')." },
            summary: { type: Type.STRING, description: "A very brief, one-sentence summary of the user's request." },
            priority: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Assign a priority level." },
        },
        required: ["category", "summary", "priority"]
    };

    return generateWithSchema(prompt, schema);
};