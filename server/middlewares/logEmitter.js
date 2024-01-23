"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitLog = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const date_fns_1 = require("date-fns");
const emitLog = (req, res, next) => {
    const log = `${(0, date_fns_1.format)(new Date(), 'yyyy/MM/dd hh:mm:ss')}\t${req.method}\t${req.url}\n`;
    console.log(log);
    if (!fs_1.default.existsSync(path_1.default.join(path_1.default.dirname('logs'), 'logs')))
        promises_1.default.mkdir('logs');
    try {
        fs_1.default.appendFileSync(path_1.default.join(path_1.default.dirname('logs'), 'logs', 'logs.txt'), log, 'utf-8');
        next();
    }
    catch (err) {
        console.error(err);
    }
};
exports.emitLog = emitLog;
