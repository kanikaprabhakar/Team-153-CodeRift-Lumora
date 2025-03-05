// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");


// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.GEMINI_API_KEY;

// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;
        
//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
//             {
//                 contents: [{
//                     parts: [{ text: message }]
//                 }]
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 params: { 
//                     key: API_KEY 
//                 }
//             }
//         );

//         if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
//             throw new Error('Invalid response from Gemini API');
//         }

//         res.json({ 
//             reply: response.data.candidates[0].content.parts[0].text 
//         });

//     } catch (error) {
//         console.error("Gemini API Error:", error.response?.data || error.message);
//         res.status(500).json({ 
//             error: "Failed to connect to AI.",
//             details: error.message
//         });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));




// require("dotenv").config(); // ✅ Must be at the top

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.GEMINI_API_KEY;

// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}",
//             {
//                 contents: [{ parts: [{ text: message }] }]
//             },
//             {
//                 headers: { "Content-Type": "application/json" },
//                 params: { key: API_KEY }
//             }
//         );

//         const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

//         res.json({ reply });

//     } catch (error) {
//         console.error("Gemini API Error:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));







// require("dotenv").config(); // ✅ Must be at the top

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.GEMINI_API_KEY;

// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//             {
//                 contents: [{ parts: [{ text: message }] }]
//             },
//             {
//                 headers: { "Content-Type": "application/json" },
//                 params: { key: API_KEY }
//             }
//         );

//         const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

//         res.json({ reply });

//     } catch (error) {
//         console.error("Gemini API Error:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));











require("dotenv").config(); // Must be at the top

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: message }] }]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: API_KEY }
            }
        );

        const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

        res.json({ reply });

    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));