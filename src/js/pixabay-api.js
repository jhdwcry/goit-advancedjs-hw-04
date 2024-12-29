import axios from "axios";

const API_KEY = "47906037-2c0a065ebc1b1a12e8c8fed40";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1) {
  const perPage = 15;
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error("Failed to fetch images.");
  }

  return response.data;
}
