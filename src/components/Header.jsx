import { useLocation } from 'preact-iso';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Header() {
	const { url } = useLocation();
	const isBeta = import.meta.env.VITE_BETA === 'true';

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
				{isBeta ? (
					<>

						<a href="/console" class={url == '/console' && 'active'}>
							<i class="fas fa-terminal"></i>
						</a>
					</>
				) : <>

				</>}

			</nav>
		</header>
	);
}
