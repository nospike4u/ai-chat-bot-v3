import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import axios from "axios";

const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_APIKEY,
});

app.get("/", (req, res) => {
  res.send("Checking server");
});

app.get("/api/v1/ai-chat-bot/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/v1/ai-chat-bot/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "assistant", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const aiReply = response.reply;
    console.log("AI Reply:", aiReply);
    res.json({ reply: aiReply });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/v1/ai-chat-bot/weather/:city/", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=city`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Unable to fetch weather data." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup.");
  console.log("Server running on", PORT);
});
