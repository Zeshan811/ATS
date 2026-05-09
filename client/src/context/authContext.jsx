import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('ats_token');
        if (!token) { setLoading(false); return; }
        try {
            const { data } = await authService.getMe();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch {
            localStorage.removeItem('ats_token');
            localStorage.removeItem('ats_user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadUser(); }, [loadUser]);

    const login = async (credentials) => {
        const { data } = await authService.login(credentials);
        localStorage.setItem('ats_token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
    };

    const register = async (userData) => {
        const { data } = await authService.register(userData);
        localStorage.setItem('ats_token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
    };

    const logout = () => {
        localStorage.removeItem('ats_token');
        localStorage.removeItem('ats_user');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUser = (updatedUser) => setUser(updatedUser);

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};