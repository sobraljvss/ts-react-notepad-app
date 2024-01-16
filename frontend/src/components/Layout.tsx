import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header>
				<h1>Notepad App</h1>
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
