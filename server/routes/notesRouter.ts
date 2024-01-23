import express from 'express';
import {
	getAllNotes,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
} from '../controllers/notesController';

export const router = express.Router();

router.get('/notes', getAllNotes);
router.post('/notes', createNote);

router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);
