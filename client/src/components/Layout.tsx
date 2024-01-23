import '../styles/Layout.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
	const navigateTo = useNavigate();

	return (
		<>
			<header>
				<h1>Notepad App</h1>
				<button onClick={() => navigateTo('/notes/new')}>+</button>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<p>{new Date().toDateString()}</p>
			</footer>
		</>
	);
};

export default Layout;
