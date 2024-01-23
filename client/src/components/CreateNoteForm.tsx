import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../interfaces/interfaces';
import api from '../api/api';
import '../styles/NotePage.css';
import '../styles/NoteForm.css';

const CreateNoteForm = () => {
	const navigateTo = useNavigate();

	const [operationError, setOperationError] = useState<string | undefined>();
	const [noteData, setNoteData] = useState<Note>({
		id: '',
		postDatetime: '',
		title: '',
		body: '',
	});

	const operationErrorRef = useRef<HTMLParagraphElement>();

	const createNote = async (noteData: Note): Promise<void> => {
		try {
			const response = await api.post(
				'/notes',
				{ title: noteData.title, body: noteData.body },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response?.data) throw new Error('No response from server');
			if (response?.status !== 201) throw new Error(response.data.message);

			navigateTo(`/notes/${response.data.note.id}`);
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

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
						/>
						{/* <label htmlFor="body-box">Body:</label> */}
						<textarea
							id="body-box"
							placeholder="Body"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, body: e.target.value })
							}
						/>
					</div>
					<button
						type="submit"
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							createNote(noteData);
						}}
					>
						Create
					</button>
				</form>
				{operationError && <p className="error">{operationError}</p>}
			</article>
			<button onClick={() => navigateTo('/notes')}>Return to home</button>
		</>
	);
};

export default CreateNoteForm;
