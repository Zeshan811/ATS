import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // On mount: restore user from localStorage (no /me endpoint in backend)
    useEffect(() => {
        const token = localStorage.getItem('ats_token');
        const stored = localStorage.getItem('ats_user');
        if (token && stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem('ats_token');
                localStorage.removeItem('ats_user');
            }
        }
        setLoading(false);
    }, []);

    // Backend login returns { token, role, name }
    const login = async (credentials) => {
        const { data } = await authService.login(credentials);
        // Normalise role to lowercase so ProtectedRoute comparisons work
        const userData = {
            name: data.name,
            role: data.role?.toLowerCase(), // "HR" → "hr", "Candidate" → "candidate"
            token: data.token,
        };
        localStorage.setItem('ats_token', data.token);
        localStorage.setItem('ats_user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
    };

    // Backend register returns { message } only (no auto-login token)
    const register = async (userData) => {
        await authService.register(userData);
        // After registration, auto-login with the same credentials
        return login({ email: userData.email, password: userData.password });
    };

    const logout = () => {
        localStorage.removeItem('ats_token');
        localStorage.removeItem('ats_user');
        setUser(null);
        setIsAuthenticated(false);
    };
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('ats_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, isAuthenticated, login, register, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
