"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    SERVICE_NAME: require('../../package.json').name,
    PORT: Number(process.env.PORT) || 3000,
    DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT || '30000'),
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET || 'your-default-auth-secret-key',
    GATEWAY_JWT_SECRET: process.env.GATEWAY_JWT_SECRET || 'your-default-gateway-secret-key',
    GATEWAY_JWT_EXPIRES_IN: process.env.GATEWAY_JWT_EXPIRES_IN || '1m',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    CONTENT_SERVICE_URL: process.env.CONTENT_SERVICE_URL || 'http://localhost:3002',
    AI_SERVICE_URL: process.env.AI_SERVICE_URL || 'http://192.168.56.191:5000',
};
