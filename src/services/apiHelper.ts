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
  //timeout: 5000, // Set a timeout of 5 seconds for all requests
});

// Request interceptor to add authorization headers or other custom logic
axiosInstance.interceptors.request.use(
  (config) => {
    // modify the request config here, for example, by adding headers
    //config.headers['Authorization'] = 'Bearer xxxxxx';
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
  params: Record<string, any> = {}, //for query string
  data?:any,//for request body
  cancelToken?: CancelTokenSource // Optional cancel token for request cancellation
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      // headers: {
      //   'Content-Type': 'application/json', // Explicitly set Content-Type
      // }//not requrired axios does it internally,
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


export const streamedApiRequest =  async function* (
  url: string,
  method: string = 'GET',
  data?: any
): AsyncGenerator<string> {
  const controller = new AbortController();
  const { signal } = controller;

  try {
    // Build query string for GET requests if needed
    if (method === 'GET' && data) {
      const queryParams = new URLSearchParams(data).toString();
      url += `?${queryParams}`;
    }

    const response = await fetch(url, {
      method, // 'GET' or 'POST'
      headers: {
        //Authorization: 'Bearer auth-token', //TODO
        'Content-Type': 'application/json', // or other appropriate content type
      },
      body: method === 'POST' ? JSON.stringify(data) : undefined, // Only send body for POST requests
      signal, // Attach the signal for request cancellation
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported in this environment');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Streaming completed');
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      yield chunk; // Yield each chunk as it becomes available
    }
  } catch (error:any) {
    if (error.name === 'AbortError') {
      console.log('Request was canceled');
    } else {
      console.error('Fetch error:', error);
      throw error; // Rethrow error to allow consumers to handle it
    }
  }
};




//Example of stram consumer
// async function consumeStream() {
//   const url = 'https://your-api-url';
//   const method = 'GET'; // or 'POST'
//   const data = { param1: 'value1', param2: 'value2' }; // Optional data

//   try {
//     for await (const chunk of streamedApiRequest(url, method, data)) {
//       console.log('Received chunk:', chunk);
//       // You can process the chunk here, e.g., update UI, save to a file, etc.
//     }
//   } catch (error) {
//     console.error('Error during stream consumption:', error);
//   }
// }