import { useLocation } from 'preact-iso';
import { useAuth } from '../contexts/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';


export function Header() {
	const { url } = useLocation();
	const { authenticated, login } = useAuth();

	const handleLogin = () => {
		const password = prompt('Enter the password to access the console:');
		login(password);
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
					<i class="fas fa-biking" title={"Bike Rides"}></i>
				</a>
				<a href="/oura" class={url == '/oura' && 'active'}>
					<i class="fas fa-ring" title={"Oura Ring Usage"}></i>
				</a>
				<a href="/booklog" class={url == '/booklog' && 'active'}>
					<i class="fas fa-book" title="Books"></i>
				</a>
				<a href="/blog" class={url == '/blog' && 'active'} title="Blog">
					<i class="fas fa-blog" title="Blog"></i>
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