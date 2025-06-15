interface Config {
  SERVICE_NAME: string;
  PORT: number;
  DEFAULT_TIMEOUT: number;
  AUTH_JWT_SECRET: string;
  GATEWAY_JWT_SECRET: string;
  GATEWAY_JWT_EXPIRES_IN: string;
  LOG_LEVEL: string;
  AUTH_SERVICE_URL: string;
  CONTENT_SERVICE_URL: string;
  AI_SERVICE_URL: string;
}

export const config: Config = {
  SERVICE_NAME: require('../../package.json').name,
  PORT: Number(process.env.PORT) || 8080,
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT || '30000'),
  AUTH_JWT_SECRET:
    process.env.AUTH_JWT_SECRET || 'ntppn0bK0fDo8D8H9cTe0jCljo7XbDvTgTIfNTSQ1laJfegXJo/azFHo6JIhQyMim413FMlRov5iio3INBnUXQ==',
  GATEWAY_JWT_SECRET:
    process.env.GATEWAY_JWT_SECRET || 'your-default-gateway-secret-key',
  GATEWAY_JWT_EXPIRES_IN: process.env.GATEWAY_JWT_EXPIRES_IN || '1m',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
  CONTENT_SERVICE_URL:
    process.env.CONTENT_SERVICE_URL || 'http://localhost:3002',
  AI_SERVICE_URL:
    process.env.AI_SERVICE_URL || 'http://192.168.56.191:5000',
};
