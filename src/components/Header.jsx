import { useLocation } from 'preact-iso';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Header() {
	const { url } = useLocation();

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

			</nav>
		</header>
	);
}
