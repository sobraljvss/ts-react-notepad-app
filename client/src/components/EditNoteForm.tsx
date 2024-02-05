import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Note } from '../interfaces/Note';
import api from '../api/api';
import '../styles/NoteForm.css';

const EditNoteForm = () => {
	// hooks
	const { id } = useParams();
	const navigateTo = useNavigate();

	const [operationError, setOperationError] = useState<string | undefined>();
	const [noteData, setNoteData] = useState<Note>({
		id: '',
		postDatetime: 0,
		title: '',
		body: '',
	});

	const operationErrorRef = useRef<HTMLParagraphElement>();

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
			setNoteData({ ...response.data.note });
			setOperationError('');
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

	// updates note info on database
	const updateNote = async (newNoteData: Note): Promise<void> => {
		try {
			const response = await api.put(
				`/notes/${id}`,
				{
					title: newNoteData.title,
					body: newNoteData.body,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response) throw new Error('No response from server');
			if (response?.status !== 204) throw new Error(response.data.message);
			setOperationError('');
			navigateTo(`/notes/${id}`);
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

	// gets note at load
	useEffect(() => {
		if (id) getNoteById(id);
	}, []);

	// focuses error
	useEffect(() => operationErrorRef.current?.focus(), [operationError]);

	return (
		<>
			<article className="note-form-page">
				<form className="note-create-update-form">
					<div className="expanded-note">
						<textarea
							id="title-box"
							placeholder="Title"
							aria-label="Title"
							spellCheck="false"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, title: e.target.value })
							}
							value={noteData.title}
						/>
						<textarea
							id="body-box"
							placeholder="Body"
							aria-label="Body"
							spellCheck="false"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, body: e.target.value })
							}
							value={noteData.body}
						/>
					</div>
					<button
						type="submit"
						aria-label="Update"
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							updateNote(noteData);
						}}
						className="form-main-button"
					>
						Update
					</button>
				</form>
				{operationError && (
					<p className="error" role="alert" aria-live="assertive">
						{operationError}
					</p>
				)}
			</article>
			<Link to={`/notes/${id}`} className="return-link" role="link">
				{'<'}Return to note
			</Link>
		</>
	);
};

export default EditNoteForm;
