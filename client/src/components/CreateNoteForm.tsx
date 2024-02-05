import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Note } from '../interfaces/Note';
import api from '../api/api';
import '../styles/NotePage.css';
import '../styles/NoteForm.css';

const CreateNoteForm = () => {
	// hooks
	const navigateTo = useNavigate();

	const [operationError, setOperationError] = useState<string | undefined>();
	const [noteData, setNoteData] = useState<Note>({
		id: '',
		postDatetime: 0,
		title: '',
		body: '',
	});

	const operationErrorRef = useRef<HTMLParagraphElement>();

	// add note to database
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

			setOperationError('');
			navigateTo(`/notes/${response.data.note.id}`);
		} catch (err: any) {
			setOperationError(err.message);
		}
	};

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
						/>
						<textarea
							id="body-box"
							placeholder="Body"
							aria-label="Body"
							spellCheck="false"
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setNoteData({ ...noteData, body: e.target.value })
							}
						/>
					</div>
					<button
						type="submit"
						aria-label="Create"
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							createNote(noteData);
						}}
						className="form-main-button"
					>
						Create
					</button>
				</form>
				{operationError && (
					<p className="error" role="alert" aria-live="assertive">
						{operationError}
					</p>
				)}
			</article>
			<Link to="/notes" className="return-link" role="link">
				{'<'}Return to home
			</Link>
		</>
	);
};

export default CreateNoteForm;
