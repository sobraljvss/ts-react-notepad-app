import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Note } from '../interfaces/interfaces';
import api from '../api/api';
import '../styles/NotePage.css';
import '../styles/NoteForm.css';

const EditNoteForm = () => {
	const { id } = useParams();
	const navigateTo = useNavigate();

	const [operationError, setOperationError] = useState<string | undefined>();
	const [noteData, setNoteData] = useState<Note>({
		id: '',
		postDatetime: '',
		title: '',
		body: '',
	});

	const operationErrorRef = useRef<HTMLParagraphElement>();

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
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

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
			navigateTo(`/notes/${id}`);
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

	useEffect(() => {
		if (id) getNoteById(id);
	}, []);

	useEffect(() => operationErrorRef.current?.focus(), [operationError]);

	return (
		<>
			<article className="create-update-note-page">
				<form className="note-create-update-form">
					<div className="expanded-note">
						{/* <label htmlFor="title-box">Title:</label> */}
						<textarea
							id="title-box"
							placeholder="Title"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, title: e.target.value })
							}
							value={noteData.title}
						/>
						{/* <label htmlFor="body-box">Body:</label> */}
						<textarea
							id="body-box"
							placeholder="Body"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, body: e.target.value })
							}
							value={noteData.body}
						/>
					</div>
					<button
						type="submit"
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							updateNote(noteData);
						}}
					>
						Update
					</button>
				</form>
				{operationError && <p className="error">{operationError}</p>}
			</article>
			<button onClick={() => navigateTo(`/notes/${id}`)}>Return to note</button>
		</>
	);
};

export default EditNoteForm;
