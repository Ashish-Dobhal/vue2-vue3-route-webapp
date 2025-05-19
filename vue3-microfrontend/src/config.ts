// Simple configuration for development vs. production
export const isDev = import.meta.env.DEV || false;
export const version = '1.0.0';

// You can add more simple config variables here
export const config = {
  apiBaseUrl: isDev ? 'http://localhost:3000/api' : 'https://api.example.com',
  appTitle: isDev ? 'MFE Dev Mode' : 'Micro Frontend',
  showDevIndicator: isDev
};
