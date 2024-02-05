import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
	return (
		<>
			<div className="not-found">
				<h1>Page not found</h1>
				<p>Sorry, but this note seems to be deleted.</p>
			</div>
			<Link to="/notes" className="return-link" role="link">
				{'<'}Return to home
			</Link>
		</>
	);
};

export default NotFound;
