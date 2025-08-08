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

// Netlify Function handler for generating success stories
export const handler = async () => {
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

    try {
        const result = await generateWithSchema(prompt, schema);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in generateSuccessStories function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to generate success stories: ${error.message}` }),
        };
    }
};
