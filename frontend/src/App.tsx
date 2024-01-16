import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Notes from './components/Notes';
import NotePage from './components/NotePage';
import CreateNoteForm from './components/CreateNoteForm';
import EditNoteForm from './components/EditNoteForm';
import NotFound from './components/NotFound';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index path="/notes" element={<Notes />} />
				<Route path="/notes/:id" element={<NotePage />} />
				<Route path="/notes/:id/new" element={<CreateNoteForm />} />
				<Route path="/notes/:id/edit" element={<EditNoteForm />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
