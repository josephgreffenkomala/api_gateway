"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const _1 = require(".");
const logger = winston_1.default.createLogger({
    level: _1.config.LOG_LEVEL,
    defaultMeta: { service: _1.config.SERVICE_NAME },
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp, service }) => {
        return `[${timestamp}] [${level}] [${service}]: ${message}`;
    })),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
