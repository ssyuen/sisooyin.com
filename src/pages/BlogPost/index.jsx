import { h } from 'preact';
import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';

const BlogPost = () => {
    const [post, setPost] = useState({
        id: 1,
        title: 'First Post',
        content: 'This is the first post on the blog.'
    });
    const errorPost = {
        id: 0,
        title: 'Error',
        content: 'Error fetching post. Sorry!'
    };
    const { path } = useLocation();
    const blogId = path.split('/')[2];
    console.log(blogId)

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? `http://127.0.0.1:5000/api/blog/post/${blogId}` : `https://api.sisooyin.com/api/blog/post/${blogId}`;
    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setPost(errorPost);
            });
    });

    return (
        <div style={{ textAlign: 'left', margin: '10px' }}>
            <h1>{post.id} - {post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default BlogPost;