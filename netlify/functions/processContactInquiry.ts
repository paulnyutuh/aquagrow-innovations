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

// Netlify Function handler for processing contact inquiries
export const handler = async (event: { httpMethod: string, body: string | null }) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!event.body) {
        return { statusCode: 400, body: 'Missing request body' };
    }

    try {
        const formData = JSON.parse(event.body);
        const { name, subject, message } = formData;

        if (!name || !subject || !message) {
            return { statusCode: 400, body: 'Missing required form fields.' };
        }

        const prompt = `A user has submitted a contact form for AquaGrow Innovations. Analyze their message and provide a structured response. User Name: ${name}, Subject: ${subject}, Message: "${message}". Classify the inquiry, provide a one-sentence summary, and assign a priority.`;

        const schema = {
            type: Type.OBJECT,
            properties: {
                category: { type: Type.STRING, description: "Classify the inquiry (e.g., 'Farmer Partnership', 'Investor Relations', 'General Question')." },
                summary: { type: Type.STRING, description: "A very brief, one-sentence summary of the user's request." },
                priority: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Assign a priority level." },
            },
            required: ["category", "summary", "priority"]
        };

        const result = await generateWithSchema(prompt, schema);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };

    } catch (error) {
        console.error("Error in processContactInquiry function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to process inquiry: ${error.message}` }),
        };
    }
};
