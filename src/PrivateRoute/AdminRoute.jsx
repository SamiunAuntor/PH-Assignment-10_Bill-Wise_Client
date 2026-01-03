import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { LifeLine } from "react-loading-indicators";

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const token = await user.getIdToken();
                const res = await fetch('https://bill-wise-server.vercel.app/user-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setUserRole(data?.role || 'user');
            } catch (err) {
                console.error('Error fetching user role:', err);
                setUserRole('user');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchUserRole();
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (userRole !== 'admin') {
        return <Navigate to="/dashboard/home" replace />;
    }

    return children;
};

export default AdminRoute;

