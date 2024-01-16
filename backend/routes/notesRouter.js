"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const notesController_1 = require("../controllers/notesController");
exports.router = express_1.default.Router();
exports.router.get('/notes', notesController_1.getAllNotes);
exports.router.post('/notes', notesController_1.createNote);
exports.router.get('/notes/:id', notesController_1.getNoteById);
exports.router.put('/notes/:id', notesController_1.updateNote);
exports.router.delete('/notes/:id', notesController_1.deleteNote);
