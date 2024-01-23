import { useEffect, useRef, useState } from 'react';
import api from '../api/api';

import '../styles/Notes.css';
import { Note } from '../interfaces/interfaces';
import NoteCard from './NoteCard';

const Notes = () => {
	const [fetchError, setFetchError] = useState<string | undefined>(undefined);
	const [notes, setNotes] = useState<Note[]>([]);

	const fetchErrorRef = useRef<HTMLParagraphElement>();

	useEffect(() => {
		const getAllNotes = async (): Promise<void> => {
			try {
				const response = await api.get('/notes', {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response?.data) throw new Error('No response from server');
				if (response?.status !== 200) throw new Error(response.data.message);
				console.log(response.data);
				setNotes(response.data);
			} catch (err: any) {
				setFetchError(err.message);
			}
		};

		getAllNotes();
	}, []);

	useEffect(() => {
		fetchErrorRef.current?.focus();
	}, [fetchError]);

	return (
		<>
			<dl className="all-notes">
				{notes?.length ? (
					notes.map((note: Note, key: number) => <NoteCard key={key} note={note} />)
				) : (
					<p>Write a note!</p>
				)}
			</dl>
			{fetchError && <p className="error">{fetchError}</p>}
		</>
	);
};

export default Notes;
