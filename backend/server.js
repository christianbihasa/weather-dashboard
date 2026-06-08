import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Rate Limiting to prevent API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  message: {
    error: "Too many requests from this endpoint. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 2. Security Configuration: Strict CORS Whitelist
const allowedOrigins = [
  "http://localhost:5173", // Vite default port
  "http://localhost:5174", // Vite fallback port
  "https://christianbihasa.github.io",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Access denied by CORS security architecture."));
      }
    },
  }),
);

// 3. Operational Analytics Routing (Dynamic Endpoint Handler)
app.get("/api/:endpoint", async (req, res) => {
  const { endpoint } = req.params; // Captures 'weather' or 'forecast'
  const { city, lat, lon, units } = req.query;

  if (endpoint !== "weather" && endpoint !== "forecast") {
    return res.status(404).json({ error: "Resource endpoint invalid." });
  }

  const apiParams = {
    appid: process.env.WEATHER_API_KEY,
    units: units || "metric",
  };

  if (city) {
    apiParams.q = city;
  } else if (lat && lon) {
    apiParams.lat = lat;
    apiParams.lon = lon;
  } else {
    return res
      .status(400)
      .json({ error: "Missing parameters: Provide city name or coordinates." });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/${endpoint}`,
      {
        params: apiParams,
      },
    );
    return res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      "Upstream server failed to process data request.";
    return res.status(status).json({ error: message });
  }
});

// 4. Critical Event Loop Listener to monitor server health
app.listen(PORT, () => {
  console.log(`[SYSTEM RUNNING]: Secure proxy server deployed on port ${PORT}`);
});
