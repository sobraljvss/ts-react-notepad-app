"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const corsAllower_1 = require("./config/corsAllower");
const notesRouter_1 = require("./routes/notesRouter");
const logEmitter_1 = require("./middlewares/logEmitter");
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(logEmitter_1.emitLog);
app.use((0, cors_1.default)(corsAllower_1.corsOptions));
app.use(body_parser_1.default.json());
app.use(notesRouter_1.router);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
