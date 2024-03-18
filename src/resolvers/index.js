import { fetch } from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

// Replace with your own API key
// You can get one by signing up at https://www.weatherapi.com/
// This should be kept secret and used from environment variables
const key = "93446159ec0a46b3bf903423241803";

// Define a resolver function
resolver.define("getWeather", async (req) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${req.payload.location}`
  );
  const data = await res.json();

  return data.current;
});

resolver.define("getLocations", async (req) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${key}&q=${req.payload.query}`
  );
  const data = await res.json();

  return data;
});

export const handler = resolver.getDefinitions();
