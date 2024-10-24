import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import Resume from './pages/Resume/index.jsx';
import './style.css';
import BOP from './pages/BOP/index.jsx';
import Booklog from './pages/Booklog/index.jsx';
import Console from './pages/Console/index.jsx';


export function App() {

	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/resume" component={Resume} />
					<Route path="/bikingOnePiece" component={BOP} />
					<Route path="/booklog" component={Booklog} />
					<Route path="/console" component={Console} />
					
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));