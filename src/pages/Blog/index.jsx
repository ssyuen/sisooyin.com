import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'preact-iso';
import './style.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authenticated, login } = useAuth();
    const { route } = useLocation();

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/blog/posts' : 'https://api.sisooyin.com/api/blog/posts';

    useEffect(() => {
        setLoading(true);
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handlePostClick = (post) => {
        if (post.isPasswordLocked && !authenticated) {
            const password = prompt('Enter the password to access this post:');
            if (login(password)) {
                route(`/blog/${post.id}`);
            }
        } else {
            route(`/blog/${post.id}`);
        }
    };

    return (
        <div className="blog-list">
            <h1>Blog Posts</h1>
            <ul>
                {posts.length === 0 && <li>No posts found.</li>}
                {!loading ? (posts.map((post, index) => (
                    <li key={post.id}>
                        {post.date} - #{post.id}: <a href={`#`} onClick={() => handlePostClick(post)}>{post.title}</a>
                    </li>
                ))) : 'Loading...'}
            </ul>
        </div>
    );
};

export default Blog;