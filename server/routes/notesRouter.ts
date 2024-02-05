import express from 'express';
import {
	getAllNotes,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
} from '../controllers/notesController';

export const router = express.Router();

// routes to /notes
router.get('/notes', getAllNotes);
router.post('/notes', createNote);

// routes to /notes/:id
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);
