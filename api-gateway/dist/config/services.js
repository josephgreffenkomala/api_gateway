"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyServices = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const _1 = require(".");
const logger_1 = __importDefault(require("./logger"));
const cookie_1 = __importDefault(require("cookie")); // Tambahkan ini di bagian import
class ServiceProxy {
    static serviceConfigs = [
        {
            path: '/auth/',
            url: _1.config.AUTH_SERVICE_URL,
            pathRewrite: { '^/auth/': '/' },
            name: 'auth-service',
            timeout: 5000,
        },
        {
            path: '/AI/',
            url: 'http://192.168.56.191:5000',
            pathRewrite: { '^/AI/': '/' },
            name: 'AI-service',
        },
        {
            path: '/progress/',
            url: 'https://pts.koyeb.app/api/progress',
            pathRewrite: { '^/progress/': '/' },
            name: 'progress-service',
        },
    ];
    static createProxyOptions(service) {
        return {
            target: service.url,
            changeOrigin: true,
            pathRewrite: service.pathRewrite,
            timeout: service.timeout || _1.config.DEFAULT_TIMEOUT,
            logger: logger_1.default,
            on: {
                error: ServiceProxy.handleProxyError,
                proxyReq: ServiceProxy.handleProxyRequest,
                proxyRes: ServiceProxy.handleProxyResponse,
            },
        };
    }
    static handleProxyError(err, req, res) {
        logger_1.default.error(`Proxy error for ${req.path}:`, err);
        const errorResponse = {
            message: 'Service unavailable',
            status: 503,
            timestamp: new Date().toISOString(),
        };
        res
            .status(503)
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(errorResponse));
    }
    static handleProxyRequest(proxyReq, req, res) {
        logger_1.default.debug(`Proxying request to ${req.path}`);
        // Ambil token dari cookie dan forward ke header Authorization
        const cookies = req.headers.cookie ? cookie_1.default.parse(req.headers.cookie) : {};
        const token = cookies.token;
        if (token) {
            proxyReq.setHeader('Authorization', `Bearer ${token}`);
        }
    }
    static handleProxyResponse(proxyRes, req, res) {
        logger_1.default.debug(`Received response for ${req.path}`);
        // Tangkap response dari /auth/ dan simpan token ke cookie
        if (req.path.startsWith('/auth/')) {
            let body = Buffer.from('');
            proxyRes.on('data', (chunk) => {
                body = Buffer.concat([body, chunk]);
            });
            proxyRes.on('end', () => {
                try {
                    const responseBody = JSON.parse(body.toString());
                    if (responseBody.token) {
                        res.cookie('token', responseBody.token, { httpOnly: true, secure: true });
                    }
                    res.end(body);
                }
                catch (err) {
                    logger_1.default.error('Error parsing auth response:', err);
                    res.status(500).end('Internal Server Error');
                }
            });
        }
    }
    static setupProxy(app) {
        ServiceProxy.serviceConfigs.forEach((service) => {
            const proxyOptions = ServiceProxy.createProxyOptions(service);
            app.use(service.path, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions));
            logger_1.default.info(`Configured proxy for ${service.name} at ${service.path}`);
        });
    }
}
const proxyServices = (app) => {
    ServiceProxy.setupProxy(app);
};
exports.proxyServices = proxyServices;
