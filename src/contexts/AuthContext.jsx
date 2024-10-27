import {  useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = (password) => {
        const sanitizeInput = (input) => {
            return input.replace(/[^a-zA-Z0-9]/g, '');
        };
        const sanitizedPassword = sanitizeInput(password);
        if (sanitizedPassword === import.meta.env.VITE_CONSOLE_PASSWORD) {
            setAuthenticated(true);
            return true;
        } else {
            alert('Incorrect password');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{authenticated, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);