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
    const [searchQuery, setSearchQuery] = useState("");

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

    // Separate search effect
    const displayedBills = bills.filter((bill) => {
        const query = searchQuery.toLowerCase();
        return (
            bill.title.toLowerCase().includes(query) ||
            bill.category.toLowerCase().includes(query) ||
            bill.amount.toString().includes(query)
        );
    });

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

                {/* Filtering & Search Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 mr-4">

                    {/* Search Bar */}
                    <div className="relative w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search bills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2 rounded-lg bg-white shadow-md border border-blue-300 focus:outline-none text-blue-600 font-semibold"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="appearance-none pl-10 pr-10 py-2 rounded-lg bg-white shadow-md border border-blue-300 
                                       focus:outline-none text-blue-600 font-semibold cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Gas">Gas</option>
                            <option value="Water">Water</option>
                            <option value="Internet">Internet</option>
                        </select>

                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Cards grid */}
                {displayedBills.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {displayedBills.map((bill) => (
                            <div
                                key={bill._id}
                                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 
                                           flex flex-col h-full w-full max-w-[340px] border border-transparent hover:border-blue-100"
                            >
                                {/* Image */}
                                <div className="w-full h-64 bg-blue-200 rounded-lg overflow-hidden">
                                    <img
                                        src={bill.image || "/default-bill.jpg"}
                                        alt="bill"
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Text Contents */}
                                <div className="mt-4 flex-grow">
                                    <h3 className="text-lg font-bold text-blue-600 line-clamp-1">
                                        {bill.title}
                                    </h3>

                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-gray-700">
                                            <strong>Category :</strong> {bill.category}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Location :</strong> {bill.location}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Amount :</strong> {bill.amount} BDT
                                        </p>
                                    </div>
                                </div>

                                {/* See Details Button */}
                                <button
                                    onClick={() => navigate(`/bills/${bill._id}`)}
                                    className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg 
                                               hover:bg-blue-700 transition duration-300 shadow-sm"
                                >
                                    See Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-inner border border-blue-100">
                        <svg className="w-16 h-16 text-blue-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xl font-bold text-blue-800">No bills found</p>
                        <p className="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillsPage;