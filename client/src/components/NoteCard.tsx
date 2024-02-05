import { useNavigate } from 'react-router-dom';
import { Note } from '../interfaces/Note';
import '../styles/NoteCard.css';

import { format } from 'date-fns';

type Props = {
	note: Note;
};

const NoteCard = ({ note }: Props) => {
	const navigateTo = useNavigate();

	return (
		<li className="note-card" tabIndex={0} onClick={() => navigateTo(note.id)}>
			<h2 className="title">{note.title}</h2>
			<p className="datetime">{format(new Date(note.postDatetime), 'yyyy/MM/dd hh:mm:ss')}</p>
		</li>
	);
};

export default NoteCard;
