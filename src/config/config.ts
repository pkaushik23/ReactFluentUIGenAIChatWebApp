let configPromise: Promise<any>;

if (import.meta.env.MODE === 'development') {
  configPromise = import('./config.dev');
} else {
  configPromise = import('./config.prod');
}

export const getConfig = async () => {
  const config = await configPromise;
  return {
    API_URL: config.API_URL,
    graphConfig: config.graphConfig,
    msalConfig: config.msalConfig,
    loginRequest: config.loginRequest,
  };
};