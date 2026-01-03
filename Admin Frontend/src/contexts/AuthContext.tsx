import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { authAPI } from "@/lib/api";

interface User {
    id: string;
    username: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

// Helper to decode JWT payload safely
const decodeJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on mount
        const initializeAuth = () => {
            const token = localStorage.getItem('admin_token');
            const storedUser = localStorage.getItem('admin_user');

            if (token && storedUser) {
                const decoded = decodeJwt(token);
                const currentTime = Date.now() / 1000;

                // Check if token is valid and not expired
                if (decoded && decoded.exp > currentTime) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch {
                        handleLogout();
                    }
                } else {
                    // Token expired
                    handleLogout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setUser(null);
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await authAPI.login(username, password);
            const token = response.data;
            
            if (response.status === 200 && token) {
                const decoded = decodeJwt(token);
                // Construct user object safely (do not store password)
                const userData: User = {
                    id: decoded?.id || 'admin',
                    username: decoded?.sub || username,
                    role: decoded?.role || 'Admin'
                };

                localStorage.setItem('admin_token', token);
                localStorage.setItem('admin_user', JSON.stringify(userData));
                setUser(userData);
                toast.success('Welcome back!');
                return true;
            } else {
                toast.error('Invalid credentials');
                return false;
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error('Login failed. Please try again.');
            return false;
        }
    };

    const logout = () => {
        handleLogout();
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
