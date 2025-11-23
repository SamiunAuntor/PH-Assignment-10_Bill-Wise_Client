import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LifeLine } from "react-loading-indicators";
import { Edit, Trash2 } from "lucide-react";

const MyPayBillsPage = () => {
    const { user } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchBills = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 500));

            try {
                const token = await user.getIdToken();
                const res = await fetch("http://localhost:5000/my-bills", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch bills");

                const data = await res.json();
                await delay;
                setBills(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    const totalBills = bills.length;
    const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

    return (
        <div className="min-h-screen bg-blue-50 p-4 md:p-10">
            <h1 className="text-3xl text-blue-600 font-bold mb-6 text-center">
                My Paid Bills
            </h1>

            {/* Summary */}
            <div className="mb-6 bg-white shadow p-5 rounded-lg flex flex-col md:flex-row gap-4 md:gap-10 justify-center text-lg items-center">
                <p className="font-semibold">
                    Total Bills Paid: <span className="text-blue-600">{totalBills}</span>
                </p>
                <p className="font-semibold">
                    Total Amount: <span className="text-green-600">৳{totalAmount}</span>
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-blue-300 rounded-lg overflow-hidden">
                    <thead className="bg-blue-200 text-gray-700">
                        <tr>
                            <th className="border border-blue-300 px-3 py-2 text-left">Username</th>
                            <th className="border border-blue-300 px-3 py-2 text-left">Email</th>
                            <th className="border border-blue-300 px-3 py-2 text-left">Amount</th>
                            <th className="border border-blue-300 px-3 py-2 text-left">Address</th>
                            <th className="border border-blue-300 px-3 py-2 text-left">Phone</th>
                            <th className="border border-blue-300 px-3 py-2 text-left">Date</th>
                            <th className="border border-blue-300 px-3 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill._id} className="hover:bg-blue-100">
                                <td className="border border-blue-300 px-3 py-2">{bill.username}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.email}</td>
                                <td className="border border-blue-300 px-3 py-2">৳{bill.amount}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.address || "N/A"}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.phone || "N/A"}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td className=" px-3 py-2 flex justify-center items-center gap-2">
                                    {/* Icon-only buttons */}
                                    <button className="text-blue-600 hover:text-blue-800 p-1">
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 p-1">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPayBillsPage;
