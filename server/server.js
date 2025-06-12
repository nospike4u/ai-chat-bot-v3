import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import axios from "axios";
import multer from "multer";
import fs from "fs";

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

// app.get("/api/v3/ai-chat-bot/", (req, res) => {
//   res.json({ message: "Hello from the backend!" });
// });

// -------------------------CHATBOT-------------------------------

app.post("/api/v3/ai-chat-bot/", async (req, res) => {
  try {
    const { message } = req.body;

    const city = req.query.city || "Islamabad";
    let weatherInfo = "";

    if (message.toLowerCase().includes("weather") || message.toLowerCase().includes("temperature")) {
      
      const weatherResponse = await axios.get(
      `${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${city}`
      );
      weatherInfo = `The current temperature in ${city} is ${weatherResponse.data.current.temp_c}°C.`;
    }

        const chatPrompt = weatherInfo
      ? `${message} Also, here's the latest weather update: ${weatherInfo}`
      : message;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "assistant", content: "You are a helpful assistant." },
        { role: "user", content: chatPrompt },
      ],
    });

    const aiReply = completion.choices[0].message.content;

    console.log("AI Reply:", completion.choices[0].message.content);
    res.json({ completion: aiReply });
  } catch (error) {
    console.log("Error:", error.reply ? error.reply.data : error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});


// -------------------------WEATHER API-------------------------------

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/v3/ai-chat-bot/", async (req, res) => {
  try {
    const city = req.query.city || "Islamabad";

    // console.log("Requested city:", city);


    const response = await axios.get(
      `${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${city}`
      );
    
    const temperature = response.data.current.temp_c;
    res.json({ temperature: temperature });
    
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Unable to fetch weather data." });
  }
});

// -------------------------IMAGE UPLOAD-------------------------------

const path = "./uploads/";
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({ 
    imageUrl: `http://localhost:8000/uploads/${req.file.filename}`, 
    message: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT;
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup.");
  console.log("Server running on", PORT);
});
