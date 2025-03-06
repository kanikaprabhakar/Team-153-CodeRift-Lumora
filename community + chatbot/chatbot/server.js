// node --version # Should be >= 18
// npm install @google/generative-ai express
require('dotenv').config();
const express = require('express');
const axios = require("axios");

// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  // responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "im making a womens mental health website and ur supposed to be the helpful mental support ai chatbot make something according to that "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, here's a draft of an AI chatbot welcome message and some example responses designed for a women's mental health website. I've focused on creating a safe, supportive, and empowering tone.\n\n**Welcome Message:**\n\n\"Hi there, and welcome. I'm here to offer a listening ear, provide information, and guide you toward helpful resources. This is a safe space. Whether you're feeling overwhelmed, stressed, or just need someone to talk to, I'm here to support you.  How are you feeling today?  Remember, it's okay to not be okay.\"\n\n**Core Principles:**\n\n*   **Empathy:**  Acknowledging and validating feelings.\n*   **Safety:** Reinforcing confidentiality and a judgment-free environment (within the limits of the chatbot's capabilities).\n*   **Empowerment:**  Encouraging self-care, coping mechanisms, and seeking professional help when needed.\n*   **Information:** Providing access to relevant articles, resources, and organizations.\n*   **Limitations:**  Being transparent about what the chatbot *cannot* do (e.g., provide diagnoses or therapy).\n\n**Example Interactions:**\n\n**User:** \"I'm feeling really anxious and overwhelmed. I have so much to do, and I don't know where to start.\"\n\n**Chatbot Response:**\n\n\"I hear you. Feeling overwhelmed with a lot on your plate is incredibly common, especially for women who often juggle multiple responsibilities. It's completely valid to feel anxious in that situation.\n\nLet's try to break things down a bit. Would you like to explore some strategies for managing anxiety, such as:\n\n*   **Mindfulness exercises?** (I can guide you through a short breathing exercise.)\n*   **Time management techniques?** (I can share some tips for prioritizing tasks.)\n*   **Grounding techniques?** (Help you reconnect with the present moment.)\n*   **Information on anxiety and support resources?** (Links to articles and organizations.)\n\nAlso, remember that it's okay to ask for help from people in your life or a professional. Is seeking additional support something you might be open to?\"\n\n**User:** \"I'm feeling really down about my body image.  I compare myself to others online and I hate how I look.\"\n\n**Chatbot Response:**\n\n\"Thank you for sharing that.  It takes courage to talk about body image concerns. It's understandable to feel down when constantly comparing yourself to others, especially with the unrealistic portrayals often seen online. You are so much more than your physical appearance.\n\nIt's important to remember that what we see online is often curated and not reality. Maybe we can consider some tips:\n*   **Unfollow social media accounts that make you feel bad.**\n*   **Focus on what your body *can* do, rather than how it looks.**\n*   **Practice self-compassion.**\n*   **Try focusing on your strengths and inner qualities.**\n*   **Suggesting resources about body positivity and self-acceptance.**\nAlso if you need to talk to a counselor, I can provide a list of services.\"\n\n**User:** \"I think I might be experiencing postpartum depression, but I'm scared to admit it.\"\n\n**Chatbot Response:**\n\n\"Thank you for sharing that with me. It's completely understandable to feel scared, and you're incredibly brave for acknowledging your feelings. Postpartum depression is a real and serious condition, and it's much more common than people realize. You are not alone, and it's not your fault.\n\nYour feelings are valid, and seeking help is a sign of strength, not weakness.\nLet's explore some resources to help understand PPD.\n*   **I can share information about postpartum depression symptoms.**\n*   **I can provide links to organizations that specialize in postpartum mental health.**\n*   **I can help you find local support groups or therapists specializing in PPD.**\n*   **I can also provide information about talking to your doctor or midwife.**\n\nRemember, getting help is the best thing you can do for yourself and your baby. You deserve to feel better.\"\n\n**User:** \"I'm in an abusive relationship, but I don't know how to leave.\"\n\n**Chatbot Response:**\n\n\"Thank you for trusting me with this information. Your safety is my top priority. It takes immense courage to acknowledge that you're in an abusive relationship.\n\nI want you to know that you are not alone, and you don't deserve to be treated this way. It can be very hard and scary to leave an abusive relationship, but there are people who can help you create a safety plan and find resources to support you.\n\nHere are some important resources:\n\n*   **The National Domestic Violence Hotline:** [Phone number and website]\n*   **[Local Domestic Violence Shelter]:** [Phone number and website]\n*   **[Link to a safety planning guide]**\n\nThese resources can provide immediate support, guidance, and a safe place to go if needed.\n\nIs it safe for you to talk right now?  If not, you can clear your browser history after this conversation.  Please remember that I am not a substitute for professional help, but I want to connect you with the resources that can assist you in getting safe and getting the support you need.\"\n\n**Important Considerations:**\n\n*   **Privacy Policy:**  Make sure your website has a clear and accessible privacy policy explaining how user data is handled.\n*   **Terms of Service:** Outline the limitations of the chatbot and emphasize that it's not a substitute for professional medical or mental health advice.\n*   **Crisis Protocol:** Have a clear protocol for handling users who express suicidal thoughts or are in immediate danger. This should include providing crisis hotline numbers and, if possible, alerting emergency services.\n*   **Regular Updates:**  Mental health information and best practices are constantly evolving. Regularly update the chatbot's knowledge base to ensure accuracy and relevance.\n*   **User Feedback:**  Continuously gather feedback from users to improve the chatbot's effectiveness and address any concerns.\n*   **Integration with Professionals:** Consider integrating the chatbot with a network of licensed therapists or counselors who can provide more personalized support.\n\nThis is just a starting point, but I hope it gives you a good foundation for building a helpful and supportive AI chatbot for your women's mental health website. Good luck!\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post("/chat", async (req, res) => {
  console.log("📩 Incoming request:", req.body.message);
  
  try {
      const { message } = req.body;
      if (!message) {
          return res.status(400).json({ error: "Message is required" });
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`,
        {
            contents: [{ role: "user", parts: [{ text: message }] }],
        },
        {
            headers: { "Content-Type": "application/json" },
            params: { key: process.env.GEMINI_API_KEY }
        }
    );
    

      console.log("🛠️ Raw API Response:", JSON.stringify(response.data, null, 2));

      const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
          console.error("⚠️ No reply from AI!");
          return res.status(500).json({ error: "AI response is undefined!" });
      }

      console.log("✅ AI Reply:", reply);
      res.json({ reply });

  } catch (error) {
      console.error("❌ Error in /chat endpoint:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
  }
});

console.log("API Key:", process.env.GEMINI_API_KEY);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



