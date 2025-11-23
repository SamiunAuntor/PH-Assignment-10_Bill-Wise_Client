import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LifeLine } from "react-loading-indicators";

const BillsPage = () => {
    const navigate = useNavigate();

    // All bills data
    const allBills = useLoaderData();

    // States
    const [bills, setBills] = useState(allBills);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");

    // minimum 500ms loading animation
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Category filtering
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        if (!category) {
            setBills(allBills);
            return;
        }

        const filtered = allBills.filter(
            (bill) => bill.category.toLowerCase() === category.toLowerCase()
        );

        setBills(filtered);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" text="" textColor="" />
            </div>
        );
    }

    return (
        <div className="bg-blue-50 min-h-screen pb-20 pt-10">
            <div className="w-11/12 mx-auto">

                {/* page title */}
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-8">
                    All Bills
                </h2>

                {/* Filtering */}
                <div className="flex justify-center mb-6">
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white shadow-md border border-blue-300 
                                   focus:outline-none text-blue-600 font-semibold"
                    >
                        <option value="">All Categories</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Gas">Gas</option>
                        <option value="Water">Water</option>
                        <option value="Internet">Internet</option>
                    </select>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bills.map((bill) => (
                        <div
                            key={bill._id}
                            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 
                                       h-[550px] flex flex-col"
                        >
                            {/* image */}
                            <div className="w-full h-[400px] bg-blue-200 rounded-lg overflow-hidden">
                                <img
                                    src={bill.image || "/default-bill.jpg"}
                                    alt="bill"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text contents */}
                            <div className="mt-4 flex-grow">
                                <h3 className="text-lg font-bold text-blue-700">{bill.title}</h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Category:</strong> {bill.category}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Location:</strong> {bill.location}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Amount:</strong> {bill.amount} BDT
                                </p>
                            </div>

                            {/* See Details Button */}
                            <button
                                onClick={() => navigate(`/bills/${bill._id}`)}
                                className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg 
                                           hover:bg-blue-700 transition"
                            >
                                See Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillsPage;
