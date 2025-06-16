import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 10000000, // 15 minutes
  max: 10000000, // limit each IP to 100 requests per windowMs
});
