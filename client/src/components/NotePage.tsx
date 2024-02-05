import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Note } from '../interfaces/Note';
import api from '../api/api';
import '../styles/NotePage.css';

import { format } from 'date-fns';

const NotePage = () => {
	// hooks
	const { id } = useParams();
	const navigateTo = useNavigate();

	const [fetchError, setFetchError] = useState<string | undefined>();
	const [note, setNote] = useState<Note | undefined>();

	const fetchErrorRef = useRef<HTMLParagraphElement>();

	// gets note by id from API
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
			setFetchError('');
		} catch (err: any) {
			if (err.response?.status === 404) navigateTo('/notfound');
			setFetchError(err.message);
		}
	};

	// deletes a note from database
	const deleteNote = async (id: string): Promise<void> => {
		try {
			const response = await api.delete(`/notes/${id}`);

			if (!response) throw new Error('No response from server');
			if (response.status !== 204) throw new Error(response.data.message);

			setFetchError('');
			navigateTo('/notes');
		} catch (err: any) {
			setFetchError(err.message);
		}
	};

	// gets note at load
	useEffect(() => {
		if (id) getNoteById(id);
	}, []);

	// focuses error
	useEffect(() => fetchErrorRef.current?.focus(), [fetchError]);

	return (
		<>
			<article className="note-page">
				<section className="expanded-note">
					<div className="note-head">
						<h2>{note?.title}</h2>
						<p>{note && format(new Date(note.postDatetime), 'yyyy/MM/dd hh:mm:ss')}</p>
					</div>
					<div className="note-body">{note?.body}</div>
				</section>
				<section className="note-page-options">
					<button aria-label="Edit note" onClick={() => navigateTo('edit')}>
						Edit
					</button>
					<button aria-label="Delete note" onClick={() => id && deleteNote(id)}>
						Delete
					</button>
				</section>
				{fetchError && (
					<p className="error" role="alert" aria-live="assertive">
						{fetchError}
					</p>
				)}
			</article>
			<Link to="/notes" className="return-link" role="link">
				{'<'}Return to home
			</Link>
		</>
	);
};

export default NotePage;
