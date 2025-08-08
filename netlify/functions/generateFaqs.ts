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


// Netlify Function handler for generating FAQs
export const handler = async () => {
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

    try {
        const result = await generateWithSchema(prompt, schema);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in generateFaqs function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate FAQs: ${error.message}` }),
        };
    }
};
