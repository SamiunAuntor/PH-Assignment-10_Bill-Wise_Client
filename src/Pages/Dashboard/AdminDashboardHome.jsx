import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { LifeLine } from 'react-loading-indicators';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBills: 0,
        totalAmount: 0,
        activeUsers: 0
    });
    const [recentBills, setRecentBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const [statsRes, billsRes] = await Promise.all([
                fetch('http://localhost:5000/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/admin/recent-bills', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const statsData = await statsRes.json();
            const billsData = await billsRes.json();

            setStats(statsData);
            setRecentBills(billsData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's an overview of your system.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Users</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <TrendingUp className="text-green-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Active Users</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <FileText className="text-purple-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Bills</p>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalBills}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <DollarSign className="text-orange-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">৳{stats.totalAmount.toLocaleString()}</p>
                </div>
            </div>

            {/* Recent Bills Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bill Payments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-blue-300 rounded-lg overflow-hidden">
                        <thead className="bg-blue-200 text-gray-700">
                            <tr className="text-center">
                                <th className="border border-blue-300 px-4 py-3">Username</th>
                                <th className="border border-blue-300 px-4 py-3">Email</th>
                                <th className="border border-blue-300 px-4 py-3">Amount</th>
                                <th className="border border-blue-300 px-4 py-3">Address</th>
                                <th className="border border-blue-300 px-4 py-3">Phone</th>
                                <th className="border border-blue-300 px-4 py-3">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBills.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No recent bills found
                                    </td>
                                </tr>
                            ) : (
                                recentBills.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-blue-50 text-center">
                                        <td className="border border-blue-300 px-4 py-3">{bill.username}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.email}</td>
                                        <td className="border border-blue-300 px-4 py-3">৳{bill.amount}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.address || 'N/A'}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.phone || 'N/A'}</td>
                                        <td className="border border-blue-300 px-4 py-3">
                                            {bill.createdAt
                                                ? new Date(bill.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
