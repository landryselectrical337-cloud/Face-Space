import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Stripe instance safely
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

// Helper to get GoogleGenAI instance safely
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes

// 1. AI Dating Wingman Chat Route
app.post("/api/wingman/chat", async (req, res) => {
  try {
    const { prompt, history, mode, targetVibe } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback friendly response if key is missing in dev mode
      return res.json({
        reply: "Hey there! I'm your AI Social Wingman on Face Space. Remember: stay genuine, listen actively, and dress for your own comfort! (Connect your Gemini API Key in Settings > Secrets for real-time live AI responses!)",
        suggestions: ["Give me an icebreaker", "How should I handle awkward silence?", "Boost my confidence right now!"],
      });
    }

    const systemInstruction = `You are "Wingman AI", the charismatic, supportive, empathetic, and witty AI Dating Assistant on Face Space.
Your goal is to build genuine confidence, offer practical date tips, suggest charming conversation icebreakers, help with outfit vibes, and roleplay date scenarios.
Always maintain a positive, uplifting tone, adhere to non-creepy, respectful dating etiquette, and encourage users with the #BetterTogether philosophy.
Mode requested: ${mode || 'general'}. Target Vibe: ${targetVibe || 'Casual & Fun'}.
Always return a direct response. Keep it engaging, scannable, and actionable.`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: prompt || "Give me a quick pre-date confidence boost!" }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const reply = response.text || "You've got this! Just be yourself and focus on having fun!";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Wingman chat error:", err);
    return res.status(500).json({
      error: "Wingman unavailable",
      reply: "Take a deep breath! You're going to do great tonight. Confidence comes from within! ✨",
    });
  }
});

// 2. AI Voiceover / Text-to-Speech Route
app.post("/api/wingman/tts", async (req, res) => {
  try {
    const { text, voice } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({ audio: null, fallback: true });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Say with warm, enthusiastic tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || "Kore" }, // Options: Kore, Puck, Fenrir, Zephyr
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audio: base64Audio });
    }
    return res.json({ audio: null, fallback: true });
  } catch (err: any) {
    console.error("TTS error:", err);
    return res.json({ audio: null, fallback: true });
  }
});

// 3. AI Safety & Anti-Bullying Shield Route
app.post("/api/safety/check", async (req, res) => {
  try {
    const { text, context } = req.body;
    const ai = getGenAI();

    if (!text || text.trim() === "") {
      return res.json({ safe: true });
    }

    if (!ai) {
      // Basic fallback keyword check
      const profaneList = ["ugly", "fat", "disgusting", "hate you", "loser", "kill yourself", "bitch", "bastard"];
      const lower = text.toLowerCase();
      const flagged = profaneList.some(w => lower.includes(w));
      return res.json({
        safe: !flagged,
        reason: flagged ? "Contains potentially hurtful or improper language." : undefined,
        flaggedWords: flagged ? ["flagged word"] : [],
      });
    }

    const systemInstruction = `You are Face Space's AI Community Safety Shield.
Your job is to analyze comments, posts, or messages to uphold positive community standards under #BetterTogether.
Flag any content that contains:
1. Appearance-shaming or insult calling (e.g. calling someone "ugly", "repulsive", etc.)
2. Bullying, harassment, or direct hate speech.
3. Excessive vulgarity, profanity, or sexually explicit harassment.
4. Spreading fake venue reports or malicious spam.

Return JSON in this format:
{
  "safe": boolean,
  "category": string (e.g., "Appearance Shaming", "Profanity", "Bullying", "Safe"),
  "reason": string (short gentle explanation),
  "cleanedText": string (a polite, kindly revised version if fixable, or replacement like "[Comment removed by Face Space AI Safety]")
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Evaluate this text: "${text}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    try {
      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch {
      return res.json({ safe: true });
    }
  } catch (err: any) {
    console.error("Safety check error:", err);
    return res.json({ safe: true });
  }
});

// 4. Hotspot Live Recommendation Route
app.post("/api/hotspots/recommend", async (req, res) => {
  try {
    const { city, vibePreference } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        recommendations: [
          { name: "The Neon Velvet Lounge", vibe: "High Energy", status: "🔥 Packed Floor", crowd: "88%", music: "House & Afrobeats" },
          { name: "Speakeasy 1928", vibe: "Cozy & Intimate", status: "🍸 Chill Vibe", crowd: "60%", music: "Lo-Fi Jazz" },
        ],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Suggest 3 trending nightlife clubs/bars/lounges for city "${city || 'Downtown'}" with preference "${vibePreference || 'Fun Date Night'}".
Return JSON array of objects with keys: name, vibe, status, crowd, music, description, dateTip.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    return res.json({ recommendations: parsed });
  } catch (err: any) {
    return res.json({ recommendations: [] });
  }
});

// 5. Stripe Payment & Status Routes
app.get("/api/stripe/status", (req, res) => {
  const stripe = getStripe();
  return res.json({
    configured: Boolean(stripe),
    message: stripe
      ? "Stripe payments active and ready!"
      : "STRIPE_SECRET_KEY not set. Using automated simulation mode.",
  });
});

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  try {
    const { itemName, amount, successUrl, cancelUrl, metadata } = req.body;
    const stripe = getStripe();

    if (!stripe) {
      return res.status(400).json({
        error: "Stripe key not configured on server",
        simulated: true,
      });
    }

    const domain = process.env.APP_URL || `http://localhost:${PORT}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: itemName || "Face Space VIP Membership",
              description: "Automated 60/20/20 Revenue Disbursement Plan",
            },
            unit_amount: Math.round((amount || 14.99) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${domain}?payment=success`,
      cancel_url: cancelUrl || `${domain}?payment=cancel`,
      metadata: metadata || {},
    });

    return res.json({ url: session.url, id: session.id });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return res.status(500).json({ error: err.message || "Failed to create checkout session" });
  }
});

// 6. Shopify Integration Status Route
app.get("/api/shopify/status", (req, res) => {
  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  return res.json({
    configured: Boolean(shopDomain && token),
    domain: shopDomain || null,
    message: shopDomain && token
      ? `Connected to Shopify Store (${shopDomain})`
      : "Shopify store domain / token not configured.",
  });
});

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Face Space server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
