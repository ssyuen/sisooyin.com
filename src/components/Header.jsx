import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Header() {
	const { url } = useLocation();
	const [authenticated, setAuthenticated] = useState(false);

	const sanitizeInput = (input) => {
		return input.replace(/[^a-zA-Z0-9]/g, '');
	}
	const handleLogin = () => {
		const password = prompt('Enter the password to access the console:');
		const sanitizedPassword = sanitizeInput(password);
		if (sanitizeInput === import.meta.env.VITE_CONSOLE_PASSWORD) {
			setAuthenticated(true);
		} else {
			alert('Incorrect password');
		}
	};

	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/resume" class={url == '/resume' && 'active'}>
					Resume
				</a>
				<a href="/bikingOnePiece" class={url == '/bikingOnePiece' && 'active'}>
					<i class="fas fa-biking"></i>
				</a>
				<a href="/booklog" class={url == '/booklog' && 'active'}>
					<i class="fas fa-book"></i>
				</a>
				{authenticated ? (
					<a href="/console" class={url == '/console' && 'active'}>
						<i class="fas fa-terminal"></i>
					</a>
				) : (
					<a href="#" onClick={handleLogin}>
						<i class="fas fa-terminal"></i>
					</a>
				)}
			</nav>
		</header>
	);
}