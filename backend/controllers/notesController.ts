import fsPromises from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';
import { Note } from '../model/Note';

const notes = {
	data: (async (): Promise<Note[]> => {
		return JSON.parse(
			await fsPromises.readFile(
				path.join(path.dirname('data'), 'data', 'notes.json'),
				'utf-8'
			)
		);
	})(),
	setData: async function (newData: Note[]): Promise<void> {
		const fullData = { ...(await this.data), ...newData };
		await fsPromises.writeFile(
			path.join(path.dirname('data'), 'data', 'notes.json'),
			JSON.stringify(fullData),
			'utf-8'
		);
	},
};

export const getAllNotes = async (req: Request, res: Response) => {
	res.status(200).json(await notes.data);
};

export const getNoteById = async (req: Request, res: Response) => {
	if (!req?.body?.id && !req?.params?.id) {
		res.status(400).json({ message: 'No ID was given' });
	} else if (req.body.id !== req.params.id) {
		res.status(400).json({ message: 'Two different IDs were given' });
	}

	const id = req.params.id ?? req.body.id;
	const note = (await notes.data).find(note => note.id === id);

	if (!note) res.status(404).json({ message: 'No note was found' });

	res.status(200).json({ note });
};

// MORE CRUD COMING SOON
