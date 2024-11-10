import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import './style.css';


const Blog = () => {
    const [posts, setPosts] = useState([{
    }]);

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
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMorePosts = () => {
        setLoading(true);
        fetch(`${apiUrl}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                setPosts(prevPosts => [...prevPosts, ...data]);
                setPage(prevPage => prevPage + 1);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);
    return (
        <div className="blog-list">
            <h1>Blog Posts</h1>
            <ul>
                {posts.length === 0 && <li>No posts found.</li>}
                {!loading ? ( posts.map((post, index) => (
                    <li key={post.id}>

                        {post.date} - #{post.id} {post.date}: <a href={`/blog/${post.id}`}>{post.title}</a>
                    </li>
                ))) : 'Loading...'}
            </ul>
        </div>
    );
};

export default Blog;