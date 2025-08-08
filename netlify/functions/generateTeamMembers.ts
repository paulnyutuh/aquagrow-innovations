import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This helper function calls the Gemini API with a specific schema.
async function generateWithSchema(prompt: string, schema: any) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    const jsonText = response.text.trim();
    // A simple check to ensure the response is valid JSON.
    if (jsonText.startsWith('[') || jsonText.startsWith('{')) {
        return JSON.parse(jsonText);
    }
    throw new Error("Received non-JSON response from AI model");
}

// Netlify Function handler for generating team members
export const handler = async () => {
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
    
    try {
        const result = await generateWithSchema(prompt, schema);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in generateTeamMembers function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate team members: ${error.message}` }),
        };
    }
};
