import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Note } from '../interfaces/interfaces';
import api from '../api/api';
import '../styles/NotePage.css';

const NotePage = () => {
	const { id } = useParams();
	const navigateTo = useNavigate();

	const [fetchError, setFetchError] = useState<string | undefined>();
	const [note, setNote] = useState<Note | undefined>();

	const fetchErrorRef = useRef<HTMLParagraphElement>();

	const getNoteById = async (id: string): Promise<void> => {
		try {
			const response = await api.get(`/notes/${id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response?.data) throw new Error('No response from server');
			if (response?.status !== 200) throw new Error(response.data.message);
			setNote({ ...response.data.note });
		} catch (err: any) {
			setFetchError(err.message);
		}
	};

	const deleteNote = async (id: string): Promise<void> => {
		try {
			const response = await api.delete(`/notes/${id}`);

			if (!response) throw new Error('No response from server');
			if (response.status !== 204) throw new Error(response.data.message);

			navigateTo('/notes');
		} catch (err: any) {
			setFetchError(err.message);
		}
	};

	useEffect(() => {
		if (id) getNoteById(id);
	}, []);

	useEffect(() => fetchErrorRef.current?.focus(), [fetchError]);

	return (
		<>
			<article className="expanded-note">
				{note && (
					<>
						<div className="note-head">
							<h2>{note.title}</h2>
							<p>{note.postDatetime}</p>
						</div>
						<div className="note-body">{note.body}</div>
					</>
				)}
				{fetchError && <p className="error">{fetchError}</p>}
			</article>
			<button onClick={() => navigateTo('edit')}>Edit</button>
			<button onClick={() => id && deleteNote(id)}>Delete</button>
			<button onClick={() => navigateTo('/notes')}>Return to home</button>
		</>
	);
};

export default NotePage;
