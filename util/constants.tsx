export const API_KEY = 'hKd8RAuyG9yTm72kRFWoMZ7TrD4smRQk';
export const INITIAL_LIMIT = 15;
export const SEARCH_LIMIT = 15;
export const TRENDING_API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${INITIAL_LIMIT}`;
export const SEARCH_API_URL = (query: string) => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${SEARCH_LIMIT}`;
