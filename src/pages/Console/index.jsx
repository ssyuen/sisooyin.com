import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';

import { BookConsole } from '../../components/BookConsole/BookConsole';
import { BlogConsole } from '../../components/BlogConsole/BlogConsole';

const Console = () => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    const [selectedConsole, setSelectedConsole] = useState('booklog');

    const handleConsoleSelect = (console) => {
        setSelectedConsole(console.target.name);
    }

    return (
        <div class="console">
            <h1>Console</h1>
            <div className="console-select">
                <button class="console-select-button" onClick={handleConsoleSelect} name={"booklog"}>Booklog</button>
                <button class="console-select-button" onClick={handleConsoleSelect} name={"blog"}>Blog</button>
            </div>
            <div className="console-content">
                {selectedConsole === 'booklog' && <BookConsole />}
                {selectedConsole === 'blog' && <BlogConsole />}

            </div>
        </div>
    );
};

export default Console;