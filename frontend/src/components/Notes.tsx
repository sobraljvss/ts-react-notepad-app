import { useEffect, useRef, useState } from 'react';
import api from '../api/api';

type Note = {
	id: string;
	title: string;
	body: string;
	postDatetime: string;
};

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
				else setNotes(response.data);
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
			{notes?.length &&
				notes.map((note: Note, key: number) => (
					<article key={key}>
						<h2>{note.title}</h2>
						<p>{note.postDatetime}</p>
						<p>{note.body}</p>
					</article>
				))}
			{fetchError && <p className="error">{fetchError}</p>}
		</>
	);
};

export default Notes;
