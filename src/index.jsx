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
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Oura from './pages/Oura/index.jsx';
import Blog from './pages/Blog/index.jsx';
import BlogPost from './pages/BlogPost/index.jsx';


const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useAuth();
	return authenticated ? <Component {...rest} /> : <Home />;
};

export function App() {

	return (
		<AuthProvider>
			<LocationProvider>
				<Header />
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/resume" component={Resume} />
						<Route path="/bikingOnePiece" component={BOP} />
						<Route path="/oura" component={Oura} />
						<Route path="/booklog" component={Booklog} />
						<Route path="/blog" component={Blog} />
						<Route path='/blog/:id' component={BlogPost} />
						<ProtectedRoute path="/console" component={Console} />

						<Route default component={NotFound} />
					</Router>
				</main>
			</LocationProvider>
		</AuthProvider>
	);
}

render(<App />, document.getElementById('app'));