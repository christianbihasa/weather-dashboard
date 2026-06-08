// src/utils/mockWeather.js

export const MOCK_CITIES = {
  manila: {
    weather: {
      coord: { lat: 14.5995, lon: 120.9842 },
      name: "Manila (Mock Mode)",
      main: { temp: 32, humidity: 75, pressure: 1010, feels_like: 36 },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
      ],
      wind: { speed: 3.6, deg: 90 },
      visibility: 10000,
      sys: { country: "PH" }, 
      dt: Math.floor(Date.now() / 1000),
    },
    forecast: {
      list: Array.from({ length: 40 }, (_, i) => {
        const futureDate = new Date(Date.now() + i * 3 * 60 * 60 * 1000);
        return {
          dt: Math.floor(futureDate.getTime() / 1000),
          main: {
            temp: 30 + Math.sin(i * 0.5) * 3,
            humidity: 70 + Math.cos(i * 0.5) * 10,
          },
          weather: [
            {
              id: 800,
              main: "Clouds",
              description: "scattered clouds",
              icon: "02d",
            },
          ],
          dt_txt: futureDate.toISOString().replace("T", " ").substring(0, 19),
        };
      }),
    },
  },
  paris: {
    weather: {
      coord: { lat: 48.8566, lon: 2.3522 },
      name: "Paris (Mock Mode)",
      main: { temp: 19, humidity: 62, pressure: 1015, feels_like: 19 },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      wind: { speed: 2.1, deg: 180 },
      visibility: 10000,
      sys: { country: "FR" },
      dt: Math.floor(Date.now() / 1000),
    },
    forecast: {
      list: Array.from({ length: 40 }, (_, i) => {
        const futureDate = new Date(Date.now() + i * 3 * 60 * 60 * 1000);
        return {
          dt: Math.floor(futureDate.getTime() / 1000),
          main: {
            temp: 18 + Math.sin(i * 0.5) * 4,
            humidity: 60 + Math.cos(i * 0.5) * 8,
          },
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
          ],
          dt_txt: futureDate.toISOString().replace("T", " ").substring(0, 19),
        };
      }),
    },
  },
};
