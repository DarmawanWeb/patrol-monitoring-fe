const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const stadiaMapsApiKey = process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY || "";

const mapsTileApiKey = process.env.NEXT_PUBLIC_MAPS_TILE_API_KEY || "";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export { apiUrl, stadiaMapsApiKey, mapsTileApiKey, geminiApiKey };
