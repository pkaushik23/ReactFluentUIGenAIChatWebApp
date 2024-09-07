// src/config.ts
let config;

if (import.meta.env.MODE === 'development') {
  config = await import('./config.dev');
} else {
  config = await import('./config.prod');
}

export const { API_URL, graphConfig, msalConfig, loginRequest } = config;
