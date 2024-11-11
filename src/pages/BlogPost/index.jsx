import { h } from 'preact';
import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';

const BlogPost = () => {
    const [post, setPost] = useState({
        id: 1,
        title: 'First Post',
        tags: 'first, post',
        content: 'This is the first post on the blog.',
        date: '2021-01-01'
    });
    const errorPost = {
        id: 0,
        title: 'Error',
        tags: 'first, post',
        content: 'Error fetching post. Sorry!',
        date: '2021-01-01'
    };
    const getRandomBrightColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [tagColors, setTagColors] = useState({});
    const [postFetched, setPostFetched] = useState(false);
    const { path } = useLocation();
    const blogId = path.split('/')[2];

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? `http://127.0.0.1:5000/api/blog/post/${blogId}` : `https://api.sisooyin.com/api/blog/post/${blogId}`;

    useEffect(() => {
        if (postFetched) return;
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                setPost(data);
                console.log(data);
                const colors = {};
                data.tags.split(", ").forEach(tag => {
                    colors[tag] = getRandomBrightColor();
                });
                setTagColors(colors);
                setPostFetched(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setPost(errorPost);
            });
    }, [apiUrl, post, tagColors]);


    return (
        <div style={{ textAlign: 'left', margin: '10px' }}>
            <h1>{post.date} - {post.title}</h1>
            <div className="tags-container">
                {post.tags.split(", ").map((tag, index) => (
                    <span
                        key={index}
                        style={{ backgroundColor: tagColors[tag] }}
                        className="tag"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
        </div>
    );
};

export default BlogPost;