import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import autosize from 'autosize';
import './style.css';

export const BlogConsole = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', content: '', tags: '', date: '', isPasswordLocked: false });
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [tagColors, setTagColors] = useState({});

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/blog/posts' : 'https://api.sisooyin.com/api/blog/posts';
    const fetchBlogs = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'content') {
            autosize(e.target);
        }
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTags = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        const updatedForm = { ...form, tags: newTags };

        if (editingBlogId) {
            updateBlog(editingBlogId, updatedForm);
        } else {
            console.log(updatedForm);
            addBlog(updatedForm);
        }
    };

    const addBlog = (blog) => {
        fetch('http://127.0.0.1:5000/api/blog/post/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        })
            .then(response => response.json())
            .then(() => {
                fetchBlogs();
                setForm({ title: '', content: '', tags: '', date: '', isPasswordLocked: false });
            })
            .catch(error => console.error('Error adding blog:', error));
    };

    const updateBlog = (id, blog) => {
        blog.id = id;
        fetch(`http://127.0.0.1:5000/api/blog/posts/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        })
            .then(response => response.json())
            .then(() => {
                fetchBlogs();
                setForm({ title: '', content: '', tags: '', date: '', isPasswordLocked: false });
                setEditingBlogId(null);
            })
            .catch(error => console.error('Error updating blog:', error));
    };

    const deleteBlog = (id) => {
        fetch(`http://127.0.0.1:5000/api/blog/post/delete/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchBlogs())
            .catch(error => console.error('Error deleting blog:', error));
    };

    const handleEdit = (blog) => {
        setForm({ title: blog.title, content: blog.content, tags: blog.tags, date: blog.date, isPasswordLocked: blog.isPasswordLocked });
        setEditingBlogId(blog.id);
    };

    const getRandomBrightColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTags = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const newTagColors = { ...tagColors };

            newTags.forEach(tag => {
                if (!newTagColors[tag]) {
                    newTagColors[tag] = getRandomBrightColor();
                }
            });

            setTagColors(newTagColors);
            setForm({ ...form, tags: newTags.join(', ') + ', ' });
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="admin-console" style={{ display: 'flex', flexDirection: 'row' }}>
            <h2>Blog Console</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    type="text"
                    name="content"
                    style={{ maxHeight: '200px' }}
                    placeholder="Content"
                    value={form.content}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    value={form.tags}
                    onChange={handleInputChange}
                    onKeyDown={handleTagInput}
                    required
                />
                <div className="tags-container">
                    {form.tags.split(',').map((tag, index) => (
                        tag.trim() && (
                            <span
                                key={index}
                                style={{ backgroundColor: tagColors[tag.trim()] }}
                                className="tag"
                            >
                                {tag.trim()}
                            </span>
                        )
                    ))}
                </div>
                <input
                    type="date"
                    name="date" 
                    value={form.date}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="isPasswordLocked">Password Locked</label>
                <input
                    type="checkbox"
                    name="isPasswordLocked"
                    checked={form.isPasswordLocked || false}
                    onChange={(e) => setForm({ ...form, isPasswordLocked: e.target.checked })}
                />
                
                <button type="submit">{editingBlogId ? 'Update' : 'Add'} Blog</button>
            </form>
            <div
                style={{
                    borderLeft: `1px solid`,
                    borderColor: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black',
                    margin: '0 20px',
                    height: '100%',
                    width: '1px'
                }}
            />
            <div className="preview-section" style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
                <h2>Blog Post Preview</h2>
                <div className="blog-post">
                    <h3>{form.title}</h3>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{form.content}</div>
                    <p>{form.date}</p>
                    <div className="tags-container">
                        {form.tags.split(',').map((tag, index) => (
                            tag.trim() && (
                                <span
                                    key={index}
                                    style={{ backgroundColor: tagColors[tag.trim()] }}
                                    className="tag"
                                >
                                    {tag.trim()}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <div className="blog-list">
                {blogs.map((blog) => {
                    const [isExpanded, setIsExpanded] = useState(false);

                    return (
                        <div key={blog.id} className="blog-item">
                            <h3 onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
                                {blog.title}
                            </h3>
                            {isExpanded && (
                                <>
                                    <p>{blog.content}</p>
                                    <p>{blog.date}</p>
                                    <div className="tags-container">
                                        {blog.tags.split(", ").map((tag, index) => (
                                            <span
                                                key={index}
                                                style={{ backgroundColor: tagColors[tag] }}
                                                className="tag"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button onClick={() => handleEdit(blog)}>Edit</button>
                                    <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogConsole;