import { useNavigate } from 'react-router-dom';
import { Note } from '../interfaces/interfaces';
import '../styles/NoteCard.css';

type Props = {
	note: Note;
};

const NoteCard = ({ note }: Props) => {
	const navigateTo = useNavigate();

	return (
		<li className="note-card" onClick={() => navigateTo(note.id)}>
			<h2 className="title">{note.title}</h2>
			<p className="datetime">{note.postDatetime}</p>
		</li>
	);
};

export default NoteCard;
