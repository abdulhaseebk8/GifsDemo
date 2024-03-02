import { INITIAL_LIMIT, SEARCH_LIMIT, TRENDING_API_URL, SEARCH_API_URL } from '../util/constants';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface ApiResponse {
  data: Gif[];
}

export const fetchTrendingGifs = async (): Promise<Gif[]> => {
  try {
    const response = await fetch(TRENDING_API_URL);
    const data: ApiResponse = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching trending GIFs:', error);
    throw new Error('Failed to fetch trending GIFs');
  }
};

export const searchGifs = async (query: string): Promise<Gif[]> => {
  try {
    const response = await fetch(SEARCH_API_URL(query));
    const data: ApiResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching GIFs:', error);
    throw new Error('Failed to search GIFs');
  }
};
