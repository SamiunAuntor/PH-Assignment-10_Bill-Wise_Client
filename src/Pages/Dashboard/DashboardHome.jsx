import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import { LifeLine } from 'react-loading-indicators';
import AdminDashboardHome from './AdminDashboardHome';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
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

        fetchUserRole();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    if (userRole === 'admin') {
        return <AdminDashboardHome />;
    }

    return <UserDashboard />;
};

export default DashboardHome;

