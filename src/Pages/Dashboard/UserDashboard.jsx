import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { LifeLine } from 'react-loading-indicators';
import {
    FileText,
    DollarSign,
    TrendingUp,
    Calendar,
    BarChart3,
    User,
    Mail,
    ShieldCheck,
    Activity,
    Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBills: 0,
        totalAmount: 0,
        averageAmount: 0,
        thisMonthBills: 0,
        thisMonthAmount: 0
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    useEffect(() => {
        calculateStats();
    }, [bills]);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const [billsRes, userRes] = await Promise.all([
                fetch('http://localhost:5000/my-bills', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/user-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            const billsData = await billsRes.json();
            const userData = await userRes.json();
            setBills(billsData);
            setDbUser(userData);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        const totalBills = bills.length;
        const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
        const averageAmount = totalBills > 0 ? totalAmount / totalBills : 0;

        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        const thisMonthBills = bills.filter((bill) => {
            if (!bill.createdAt) return false;
            const billDate = new Date(bill.createdAt);
            return billDate.getMonth() === thisMonth && billDate.getFullYear() === thisYear;
        });

        const thisMonthAmount = thisMonthBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

        setStats({
            totalBills,
            totalAmount,
            averageAmount,
            thisMonthBills: thisMonthBills.length,
            thisMonthAmount
        });
    };

    // Get recent bills (last 5)
    const recentBills = bills
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

    // Get monthly breakdown
    const monthlyBreakdown = bills.reduce((acc, bill) => {
        if (!bill.createdAt) return acc;
        const date = new Date(bill.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!acc[monthKey]) {
            acc[monthKey] = { count: 0, amount: 0 };
        }
        acc[monthKey].count += 1;
        acc[monthKey].amount += bill.amount || 0;
        return acc;
    }, {});

    const monthlyData = Object.entries(monthlyBreakdown)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-6); // Last 6 months


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
                <h1 className="text-3xl font-bold text-blue-600 mb-2">My Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your bill payment overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Bills Paid</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalBills}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">৳{stats.totalAmount.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <BarChart3 className="text-purple-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Average Amount</p>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">৳{Math.round(stats.averageAmount).toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <TrendingUp className="text-orange-600" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">This Month</p>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{stats.thisMonthBills}</p>
                    <p className="text-sm text-gray-500 mt-1">৳{stats.thisMonthAmount.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bills */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar className="text-blue-600" size={24} />
                        Recent Bills
                    </h2>
                    <div className="space-y-3">
                        {recentBills.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No bills found</p>
                        ) : (
                            recentBills.map((bill) => (
                                <div
                                    key={bill._id}
                                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{bill.username}</p>
                                        <p className="text-sm text-gray-600">
                                            {bill.createdAt
                                                ? new Date(bill.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">৳{bill.amount}</p>
                                        <p className="text-xs text-gray-500">{bill.address || 'N/A'}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Monthly Breakdown Bar Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="text-blue-600" size={24} />
                        Monthly Breakdown (Last 6 Months)
                    </h2>
                    {monthlyData.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No data available</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={monthlyData.map(([month, data]) => {
                                    const [year, monthNum] = month.split('-');
                                    const monthName = new Date(year, parseInt(monthNum) - 1).toLocaleString('default', { month: 'short' });
                                    return {
                                        month: `${monthName} ${year}`,
                                        amount: data.amount,
                                        bills: data.count
                                    };
                                })}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                    tickFormatter={(value) => `৳${value.toLocaleString()}`}
                                />
                                <Tooltip
                                    formatter={(value, name) => {
                                        if (name === 'amount') return [`৳${value.toLocaleString()}`, 'Amount'];
                                        return [value, 'Bills'];
                                    }}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar
                                    dataKey="amount"
                                    fill="#3b82f6"
                                    radius={[8, 8, 0, 0]}
                                    name="Amount"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>


        </div>
    );
};

export default UserDashboard;
