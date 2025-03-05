import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = useSelector(state => state.auth.token);
    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;
