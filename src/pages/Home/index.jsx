import preactLogo from '../../assets/preact.svg';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Home() {
	return (
		<div class="home">

			<h1>samuel yuen</h1>
			<section>
				<a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" class="social-icon">
					<i class="fab fa-linkedin"></i>
				</a>
				<a href="https://github.com/your-github-profile" target="_blank" class="social-icon">
					<i class="fab fa-github"></i>
				</a>
				<a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" class="social-icon">
					<i class="fab fa-linkedin"></i>
				</a>

			</section>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
