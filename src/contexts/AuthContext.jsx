import { useContext, useState, useEffect } from 'preact/hooks';
import { createContext } from 'preact';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(() => {
        // Initialize state from session storage
        const savedAuth = sessionStorage.getItem('authenticated');
        return savedAuth ? JSON.parse(savedAuth) : false;
    });

    const login = (password) => {
        const sanitizeInput = (input) => {
            return input.replace(/[^a-zA-Z0-9]/g, '');
        };
        const sanitizedPassword = sanitizeInput(password);
        if (sanitizedPassword === import.meta.env.VITE_CONSOLE_PASSWORD) {
            setAuthenticated(true);
            sessionStorage.setItem('authenticated', JSON.stringify(true)); // Save to session storage
            return true;
        } else {
            alert('Incorrect password');
            return false;
        }
    };

    const logout = () => {
        setAuthenticated(false);
        sessionStorage.removeItem('authenticated'); // Remove from session storage
    };

    useEffect(() => {
        // Sync state with session storage
        const savedAuth = sessionStorage.getItem('authenticated');
        if (savedAuth) {
            setAuthenticated(JSON.parse(savedAuth));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);