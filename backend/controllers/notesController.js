"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const DATE_FORMAT = 'yyyy/MM/dd hh:mm:ss';
const notes = {
    data: JSON.parse(fs_1.default.readFileSync(path_1.default.join(path_1.default.dirname('data'), 'data', 'notes.json'), 'utf-8')).Notes,
    setData: function (newData) {
        fs_1.default.writeFileSync(path_1.default.join(path_1.default.dirname('data'), 'data', 'notes.json'), JSON.stringify({ Notes: newData }), 'utf-8');
    },
};
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(notes.data);
});
exports.getAllNotes = getAllNotes;
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id) && !((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id)) {
        return res.status(400).json({ message: 'No ID was given' });
    }
    else if (((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.id) && ((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id) && req.body.id !== req.params.id) {
        return res.status(400).json({ message: 'Two different IDs were given' });
    }
    const id = (_e = req.params.id) !== null && _e !== void 0 ? _e : req.body.id;
    const note = notes.data.find((note) => note.id === id);
    if (!note)
        return res.status(404).json({ message: 'No note corresponds to the given ID' });
    return res.status(200).json({ note });
});
exports.getNoteById = getNoteById;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    if (!((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.title) && !((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.body))
        return res.status(400).json({ message: 'No data was given' });
    const newNoteData = {
        id: (0, uuid_1.v1)(),
        title: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.title,
        body: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.body,
        postDatetime: (0, date_fns_1.format)(new Date(), DATE_FORMAT),
    };
    try {
        notes.setData([...notes.data, newNoteData]);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).json({ message: `Failed to create note: ${err.message}` });
    }
});
exports.createNote = createNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (!((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.title) || !((_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.body))
        return res.status(400).json({ message: 'No data was given' });
    if (!((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.id) && !((_o = req === null || req === void 0 ? void 0 : req.params) === null || _o === void 0 ? void 0 : _o.id)) {
        return res.status(400).json({ message: 'No ID was given' });
    }
    else if (((_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.id) && ((_q = req === null || req === void 0 ? void 0 : req.params) === null || _q === void 0 ? void 0 : _q.id) && req.body.id !== req.params.id) {
        return res.status(400).json({ message: 'Two different IDs were given' });
    }
    const id = (_r = req.params.id) !== null && _r !== void 0 ? _r : req.body.id;
    const note = notes.data.find((note) => note.id === id);
    if (!note)
        return res.status(404).json({ message: 'No note corresponds to the given ID' });
    else {
        const newData = {
            id,
            title: (_t = (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.title) !== null && _t !== void 0 ? _t : note === null || note === void 0 ? void 0 : note.title,
            body: (_v = (_u = req === null || req === void 0 ? void 0 : req.body) === null || _u === void 0 ? void 0 : _u.body) !== null && _v !== void 0 ? _v : note === null || note === void 0 ? void 0 : note.body,
            postDatetime: note === null || note === void 0 ? void 0 : note.postDatetime,
        };
        try {
            notes.setData([...notes.data.filter((note) => note.id !== id), newData]);
            return res.sendStatus(204);
        }
        catch (err) {
            return res.status(500).json({ message: `Failed to update note: ${err.message}` });
        }
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _w, _x, _y, _z, _0;
    if (!((_w = req === null || req === void 0 ? void 0 : req.body) === null || _w === void 0 ? void 0 : _w.id) && !((_x = req === null || req === void 0 ? void 0 : req.params) === null || _x === void 0 ? void 0 : _x.id)) {
        return res.status(400).json({ message: 'No ID was given' });
    }
    else if (((_y = req === null || req === void 0 ? void 0 : req.body) === null || _y === void 0 ? void 0 : _y.id) && ((_z = req === null || req === void 0 ? void 0 : req.params) === null || _z === void 0 ? void 0 : _z.id) && req.body.id !== req.params.id) {
        return res.status(400).json({ message: 'Two different IDs were given' });
    }
    const id = (_0 = req.params.id) !== null && _0 !== void 0 ? _0 : req.body.id;
    const note = notes.data.find((note) => note.id === id);
    if (!note)
        return res.status(404).json({ message: 'No note corresponds to the given ID' });
    try {
        notes.setData([...notes.data.filter((note) => note.id !== id)]);
        return res.sendStatus(204);
    }
    catch (err) {
        return res.status(500).json({ message: `Failed to delete note: ${err.message}` });
    }
});
exports.deleteNote = deleteNote;
