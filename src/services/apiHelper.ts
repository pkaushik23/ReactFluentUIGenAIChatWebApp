// import axios, { AxiosResponse } from 'axios';

// /**
//  * Helper method to perform a GET request using axios.
//  * @param url - The API endpoint URL.
//  * @param params - Optional query parameters.
//  * @returns A promise that resolves to the response data or rejects with an error.
//  */
// export const getApiData = async <T>(url: string, params: Record<string, any> = {}): Promise<T> => {
//   try {
//     const response: AxiosResponse<T> = await axios.get(url, { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data from API:', error);
//     throw error; // Propagate the error so it can be handled by the caller
//   }
// };

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource, Method } from 'axios';

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  timeout: 5000, // Set a timeout of 5 seconds for all requests
});

// Request interceptor to add authorization headers or other custom logic
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, for example, by adding headers
    config.headers['Authorization'] = 'Bearer xxxxxx';
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses or errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally, for example, logging or custom error messages
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

// Helper method to perform a request using axios with custom settings
export const apiRequest = async <T>(
  method: Method,
  url: string,
  params: Record<string, any> = {},
  cancelToken?: CancelTokenSource // Optional cancel token for request cancellation
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      cancelToken: cancelToken?.token, // Attach the cancel token if provided
    };

    const response: AxiosResponse<T> = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn('Request canceled', error.message);
    } else {
      console.error('Error fetching data:', error);
    }
    throw error; // Propagate the error so it can be handled by the caller
  }
};

// // Example usage of CancelToken for request cancellation
// export const fetchWithCancellation = async () => {
//   const cancelTokenSource = axios.CancelToken.source();

//   try {
//     const data = await getApiData('/posts/1', {}, cancelTokenSource);
//     console.log('Data:', data);
//   } catch (error) {
//     console.error('Error:', error);
//   }

//   // Cancel the request (if necessary)
//   cancelTokenSource.cancel('Operation canceled by the user.');
// };
