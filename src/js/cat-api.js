import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_zOF9vaVYvRLCPyKToIzWhj09cqgYYpxHWkm34YngZLYhyG9MTetGTjwduOAth2Cz";

const errorMessage = 'Oops! Something went wrong! Try realoding the page!';
const baseUrl = 'https://api.thecatapi.com/v1';

export async function fetchBreeds() {
    try {
      const response = await axios.get(`${baseUrl}/breeds`);
      return response.data;
    } catch (error) {
      throw new Error(errorMessage);
    }
  }
  
export async function fetchCatByBreed(breedId) {
    try {
      const response = await axios.get(`${baseUrl}/images/search?breed_ids=${breedId}`);
      return response.data;
    } catch (error) {
      throw new Error(errorMessage);
    }
  }