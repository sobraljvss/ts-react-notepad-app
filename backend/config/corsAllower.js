"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const origins_1 = __importDefault(require("./origins"));
exports.corsOptions = {
    origin(requestOrigin, callback) {
        if (!requestOrigin || !origins_1.default.includes(requestOrigin)) {
            callback(new Error('Not allowed by CORS'));
        }
        else
            callback(null, requestOrigin);
    },
};
