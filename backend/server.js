require('dotenv').config();
console.log("Loaded API Key:", process.env.GEMINI_API_KEY ? "Yes" : "No");

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set. Check your .env file.");
    process.exit(1);
}

const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post('/get-solutions', async (req, res) => {
    const { problems } = req.body;

    if (!problems || problems.length < 2 || problems.length > 5) {
        return res.status(400).json({ error: "Please select between 2 to 5 issues." });
    }

    try {
        const prompt = `
        Provide **brief, structured solutions** for these women's mental health issues: ${problems.join(", ")}.
        Ensure solutions are **concise, collective**, and avoid excessive bullet points.  
        Format response as:
        **Mental Health Support Strategies**
        **[Suitable Strategy 1]**: [Key advice]
        **[Suitable Strategy 2]**: [Key advice]
        **[Suitable Strategy 3]**: [Key advice]
        **[Suitable Strategy 4]**: [Key advice]
        Keep it under **100 words** while making it impactful.
        `;

        const response = await axios.post(
            API_URL,
            { contents: [{ role: "user", parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } }
        );

        let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        // Format response for frontend display
        aiResponse = aiResponse
                .replace(/\*\*(.*?)\*\*/g, '<span class="bold-text">$1</span>') // Convert **bold** to <strong>
                .replace(/\d+\.\s(.*?):/g, '<span class="strategy-name">$1</span>:')
                .replace(/\n/g, "<br>"); 
            // .split("\n") // Split by new lines
            // .filter(line => line.trim() !== "") // Remove empty lines
            // .map(line => {
            //     const parts = line.split(":");
            //     return parts.length > 1
            //         ? `<div class="strategy"><strong>${parts[0].trim()}:</strong> ${parts[1].trim()}</div>`
            //         : `<div class="strategy">${line}</div>`;
            // })
            // .join("");

        res.json({ solutions: [aiResponse] });

    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        res.status(500).json({ error: "AI service unavailable. Please try again later." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
