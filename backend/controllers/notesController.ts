import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { Note } from '../model/Note';
import { v1 as uuid } from 'uuid';
import { format } from 'date-fns';

type CRUDOperationType = (req: Request, res: Response) => Promise<Response>;

const DATE_FORMAT = 'yyyy/MM/dd hh:mm:ss';

const notes: { data: Note[]; setData: (newData: Note[]) => void } = {
	data: JSON.parse(
		fs.readFileSync(path.join(path.dirname('data'), 'data', 'notes.json'), 'utf-8')
	).Notes,
	setData: function (newData: Note[]): void {
		fs.writeFileSync(
			path.join(path.dirname('data'), 'data', 'notes.json'),
			JSON.stringify({ Notes: newData }),
			'utf-8'
		);
	},
};

export const getAllNotes: CRUDOperationType = async (req: Request, res: Response) => {
	return res.status(200).json(notes.data);
};

export const getNoteById: CRUDOperationType = async (req: Request, res: Response) => {
	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	if (!note) return res.status(404).json({ message: 'No note corresponds to the given ID' });

	return res.status(200).json({ note });
};

export const createNote: CRUDOperationType = async (req: Request, res: Response) => {
	if (!req?.body?.title && !req?.body?.body)
		return res.status(400).json({ message: 'No data was given' });

	const newNoteData: Note = {
		id: uuid(),
		title: req?.body?.title,
		body: req?.body?.body,
		postDatetime: format(new Date(), DATE_FORMAT),
	};

	try {
		notes.setData([...notes.data, newNoteData]);
		return res.sendStatus(201);
	} catch (err: any) {
		return res.status(500).json({ message: `Failed to create note: ${err.message}` });
	}
};

export const updateNote: CRUDOperationType = async (req: Request, res: Response) => {
	if (!req?.body?.title || !req?.body?.body)
		return res.status(400).json({ message: 'No data was given' });

	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	if (!note) return res.status(404).json({ message: 'No note corresponds to the given ID' });
	else {
		const newData: Note = {
			id,
			title: req?.body?.title ?? note?.title,
			body: req?.body?.body ?? note?.body,
			postDatetime: note?.postDatetime,
		};

		try {
			notes.setData([...notes.data.filter((note: Note) => note.id !== id), newData]);
			return res.sendStatus(204);
		} catch (err: any) {
			return res.status(500).json({ message: `Failed to update note: ${err.message}` });
		}
	}
};

export const deleteNote: CRUDOperationType = async (req: Request, res: Response) => {
	if (!req?.body?.id && !req?.params?.id) {
		return res.status(400).json({ message: 'No ID was given' });
	} else if (req?.body?.id && req?.params?.id && req.body.id !== req.params.id) {
		return res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = notes.data.find((note: Note) => note.id === id);

	if (!note) return res.status(404).json({ message: 'No note corresponds to the given ID' });

	try {
		notes.setData([...notes.data.filter((note: Note) => note.id !== id)]);
		return res.sendStatus(204);
	} catch (err: any) {
		return res.status(500).json({ message: `Failed to delete note: ${err.message}` });
	}
};
