const getProcessEnv = (variable: string) => {
  const value = process.env[variable];
  if (!value) {
    throw new Error(`Missing required environment variable ${variable}`);
  }
  return value;
};

export const getConfig = () => ({
  okta: {
    endpoint: getProcessEnv("REACT_APP_OKTA_ENDPOINT"),
    clientId: getProcessEnv("REACT_APP_OKTA_CLIENT_ID")
  }
});
