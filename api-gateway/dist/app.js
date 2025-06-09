"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rate_limiter_middleware_1 = require("./middlewares/rate-limiter.middleware");
const config_1 = require("./config");
const logger_1 = __importDefault(require("./config/logger"));
const services_1 = require("./config/services");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(rate_limiter_middleware_1.limiter);
// Request logging
app.use((req, res, next) => {
    logger_1.default.debug(`${req.method} ${req.url}`);
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Service routes
(0, services_1.proxyServices)(app);
// 404 handler
app.use((req, res) => {
    logger_1.default.warn(`Resource not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'resource not found' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    logger_1.default.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});
// Start server
const startServer = () => {
    try {
        app.listen(config_1.config.PORT, () => {
            logger_1.default.info(`${config_1.config.SERVICE_NAME} running on port ${config_1.config.PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
