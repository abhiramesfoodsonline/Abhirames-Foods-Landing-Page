import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (user?.role !== 'SUPER_ADMIN') {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default SuperAdminRoute;