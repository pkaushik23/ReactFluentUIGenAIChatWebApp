import axios, { AxiosResponse } from 'axios';

/**
 * Helper method to perform a GET request using axios.
 * @param url - The API endpoint URL.
 * @param params - Optional query parameters.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const getApiData = async <T>(url: string, params: Record<string, any> = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; // Propagate the error so it can be handled by the caller
  }
};
