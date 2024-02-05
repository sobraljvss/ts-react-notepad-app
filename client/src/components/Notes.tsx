import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import api from '../api/api';

import '../styles/Notes.css';
import { Note } from '../interfaces/Note';
import NoteCard from './NoteCard';

const Notes = () => {
	// states and refs
	const [fetchError, setFetchError] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [notes, setNotes] = useState<Note[]>([]);
	const [searchResults, setSearchResults] = useState<Note[]>([]);
	const [search, setSearch] = useState<string>('');

	const fetchErrorRef = useRef<HTMLParagraphElement>();

	// gets all notes from API
	const getAllNotes = async (): Promise<void> => {
		try {
			const response = await api.get('/notes', {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response?.data) throw new Error('No response from server');
			if (response?.status !== 200) throw new Error(response.data.message);
			setNotes(response.data);
			setSearchResults(response.data);
			setFetchError('');
		} catch (err: any) {
			setFetchError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// filters notes with the given fragment in title and/or body
	const searchNotes = async (): Promise<void> => {
		setSearchResults(
			notes.filter(
				note =>
					note.title.toLowerCase().includes(search.toLowerCase()) ||
					note.body.toLowerCase().includes(search.toLowerCase())
			)
		);
	};

	// gets all notes at load
	useEffect(() => {
		getAllNotes();
	}, []);

	// filters notes at searching
	useEffect(() => {
		searchNotes();
	}, [search]);

	// focuses error
	useEffect(() => fetchErrorRef.current?.focus(), [fetchError]);

	return (
		<>
			<aside className="search-notes" role="search">
				<form
					role="search"
					onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
				>
					<input
						type="search"
						placeholder="Search notes"
						aria-label="Search notes"
						tabIndex={1}
						spellCheck="false"
						onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
					/>
				</form>
			</aside>
			<section className="all-notes">
				{isLoading ? (
					<h2>Loading...</h2>
				) : searchResults?.length ? (
					<ul>
						{searchResults.map((note: Note, key: number) => (
							<NoteCard key={key} note={note} />
						))}
					</ul>
				) : (
					<h2 role="alert">Nothing found...</h2>
				)}
			</section>
			{!isLoading && fetchError && (
				<p className="error" role="alert" aria-live="assertive">
					{fetchError}
				</p>
			)}
		</>
	);
};

export default Notes;
