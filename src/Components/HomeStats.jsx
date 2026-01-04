import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Receipt, BadgeDollarSign } from 'lucide-react';

const HomeStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://bill-wise-server.vercel.app/public-stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="h-32 flex items-center justify-center text-blue-600 font-bold">Loading Stats...</div>;

    const cards = [
        {
            label: "Total Users",
            value: stats?.totalUsers || 0,
            icon: <Users size={32} />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Active Users",
            value: stats?.activeUsers || 0,
            icon: <UserCheck size={32} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            label: "Bills Paid",
            value: stats?.totalBills || 0,
            icon: <Receipt size={32} />,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            label: "Total Amount Paid",
            value: `${stats?.totalAmount?.toLocaleString()} ৳`,
            icon: <BadgeDollarSign size={32} />,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
    ];

    return (
        <div className="py-10 bg-blue-50">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-blue-700">Our Impact in <span className='text-blue-500'>Numbers</span></h2>
                    <p className="text-gray-500 mt-3 text-lg">Trusted by thousands of users across the country</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className={`p-4 ${card.bg} ${card.color} rounded-2xl mb-4`}>
                                {card.icon}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900">{card.value}</h3>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">{card.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeStats;