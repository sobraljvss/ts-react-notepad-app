import '../styles/Layout.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
	const navigateTo = useNavigate();

	return (
		<>
			<header>
				<h1>Notepad App</h1>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<button tabIndex={0} onClick={() => navigateTo('/notes/new')}>
					+
				</button>
			</footer>
		</>
	);
};

export default Layout;
