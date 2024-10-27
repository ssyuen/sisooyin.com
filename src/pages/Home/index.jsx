import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useRef } from 'preact/hooks';
import ReCAPTCHA from 'react-google-recaptcha';


export function Home() {
	const [subtitle, setSubtitle] = useState('software engineer');

	const subtitles = ['software engineer', 'web developer', 'tech enthusiast', 'problem solver'];
	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
	const handleMouseEnter = () => {
		let index = 0;
		// select a random index from subtitles
		while (index === subtitles.indexOf(subtitle)) {
			index = Math.floor(Math.random() * subtitles.length);

		}
		setSubtitle(subtitles[index]);
	};

	return (
		<div class="home">
			<h1 className='fName'>samuel yuen</h1>
			<sub className="subtitle" onMouseEnter={handleMouseEnter}>{subtitle}</sub>
			<section class="social-icons">
				<a href="https://www.linkedin.com/in/samuel-yuen-mbt-6355b4170/" target="_blank" class="social-icon">
					<i class="fab fa-linkedin"></i>
				</a>
				<a href="https://github.com/ssyuen" target="_blank" class="social-icon">
					<i class="fab fa-github"></i>
				</a>
			</section>
			<footer class="footer">
				<p>
					See my work on <a href="/resume">my resume</a>!

				</p>
				<p>&trade; sisooyin 2024</p>
			</footer>
		</div>
	);
}