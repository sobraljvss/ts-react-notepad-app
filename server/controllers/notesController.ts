import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { Note } from '../model/Note';
import { v4 as uuid } from 'uuid';

type CRUDOperationType = (req: Request, res: Response) => Promise<Response>;

// a object containing the file data and a function that rewrites it
const notes: { data: Note[]; setData: (newData: Note[]) => void } = {
	data: JSON.parse(
		fs.readFileSync(path.join(path.dirname('data'), 'data', 'notes.json'), 'utf-8')
	).Notes,
	setData: function (newData: Note[]): void {
		fs.writeFileSync(
			path.join(path.dirname('data'), 'data', 'notes.json'),
			JSON.stringify({
				Notes: newData.sort((a: Note, b: Note) => b.postDatetime - a.postDatetime),
			}),
			'utf-8'
		);
		notes.data = newData.sort((a: Note, b: Note) => b.postDatetime - a.postDatetime);
	},
};

// return all saved notes
export const getAllNotes: CRUDOperationType = async (req: Request, res: Response) => {
	return res.status(200).json(notes.data);
};

// return the note that matches an id, if it exists
export const getNoteById: CRUDOperationType = async (req: Request, res: Response) => {
	// verify if only one valid id was given
	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	// verify if there is a matching note
	if (!note) return res.status(404).json({ message: 'No note matches the given ID' });

	return res.status(200).json({ note });
};

// create and save a new note
export const createNote: CRUDOperationType = async (req: Request, res: Response) => {
	// check if there is any data
	if (!req?.body?.title && !req?.body?.body)
		return res.status(400).json({ message: 'No data was given' });

	const newNoteData: Note = {
		id: uuid(),
		title: req?.body?.title,
		body: req?.body?.body,
		postDatetime: new Date().getTime(),
	};

	try {
		// writes new data
		notes.setData([...notes.data, newNoteData]);
		return res.status(201).json({ note: newNoteData });
	} catch (err: any) {
		return res.status(500).json({ message: `Failed to create note: ${err.message}` });
	}
};

// update the data of the note that matches an id, if it exists
export const updateNote: CRUDOperationType = async (req: Request, res: Response) => {
	// verify if only one valid id was given
	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	// verify if there is a matching note
	if (!note) return res.status(404).json({ message: 'No note matches the given ID' });
	else {
		const newData: Note = {
			id,
			title: req?.body?.title ?? note?.title,
			body: req?.body?.body ?? note?.body,
			postDatetime: note?.postDatetime,
		};

		try {
			// writes new data
			notes.setData([...notes.data.filter((note: Note) => note.id !== id), newData]);
			return res.sendStatus(204);
		} catch (err: any) {
			return res.status(500).json({ message: `Failed to update note: ${err.message}` });
		}
	}
};

// delete a note, if it exists
export const deleteNote: CRUDOperationType = async (req: Request, res: Response) => {
	// verify if only one valid id was given
	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	// verify if there is a matching note
	if (!note) return res.status(404).json({ message: 'No note matches the given ID' });

	try {
		// writes new data without the note
		notes.setData([...notes.data.filter((note: Note) => note.id !== id)]);
		return res.sendStatus(204);
	} catch (err: any) {
		return res.status(500).json({ message: `Failed to delete note: ${err.message}` });
	}
};
