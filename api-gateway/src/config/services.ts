import { Application } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { config } from '.';
import logger from './logger';
import { ProxyErrorResponse, ServiceConfig } from '../types';
import cookie from 'cookie'; // Tambahkan ini di bagian import


class ServiceProxy {
  private static readonly serviceConfigs: ServiceConfig[] = [
    {
      path: '/auth/',
      url: 'https://scalable-auth-production.up.railway.app',
      pathRewrite: { '^/auth/': '/' },
      name: 'auth-service',
      timeout: 5000,
    },
    {
      path: '/AI/',
      url:'http://192.168.56.191:5000',
      pathRewrite: { '^/AI/': '/' },
      name: 'AI-service',
    },
    {
      path: '/progress/',
      url:'https://pts.koyeb.app/api/progress',
      pathRewrite: { '^/progress/': '/' },
      name: 'progress-service',
    },
  ];

  private static createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.url,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      timeout: service.timeout || config.DEFAULT_TIMEOUT,
      logger: logger,
      on: {
        error: ServiceProxy.handleProxyError,
        proxyReq: ServiceProxy.handleProxyRequest,
        proxyRes: ServiceProxy.handleProxyResponse,
      },
    };
  }

  private static handleProxyError(err: Error, req: any, res: any): void {
    logger.error(`Proxy error for ${req.path}:`, err);

    const errorResponse: ProxyErrorResponse = {
      message: 'Service unavailable',
      status: 503,
      timestamp: new Date().toISOString(),
    };

    res
      .status(503)
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(errorResponse));
  }

  
private static handleProxyRequest(proxyReq: any, req: any, res: any): void {
  logger.debug(`Proxying request to ${req.path}`);
  // Ambil token dari cookie dan forward ke header Authorization
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (token) {
    proxyReq.setHeader('Authorization', `Bearer ${token}`);
  }
}

private static handleProxyResponse(proxyRes: any, req: any, res: any): void {
  logger.debug(`Received response for ${req.path}`);

  // Tangkap response dari /auth/ dan simpan token ke cookie
  if (req.path.startsWith('/auth/')) {
    let body = Buffer.from('');
    proxyRes.on('data', (chunk: Buffer) => {
      body = Buffer.concat([body, chunk]);
    });
    proxyRes.on('end', () => {
      try {
        const responseBody = JSON.parse(body.toString());
        if (responseBody.token) {
          res.cookie('token', responseBody.token, { httpOnly: true, secure: true });
        }
        res.end(body);
      } catch (err) {
        logger.error('Error parsing auth response:', err);
        res.status(500).end('Internal Server Error');
      }
    });
  }
}

  public static setupProxy(app: Application): void {
    ServiceProxy.serviceConfigs.forEach((service) => {
      const proxyOptions = ServiceProxy.createProxyOptions(service);
      app.use(service.path, createProxyMiddleware(proxyOptions));
      logger.info(`Configured proxy for ${service.name} at ${service.path}`);
    });
  }
}

export const proxyServices = (app: Application): void => {
  ServiceProxy.setupProxy(app);
};
