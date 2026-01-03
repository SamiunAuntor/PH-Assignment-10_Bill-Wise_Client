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
    const [showCurrentMonth, setShowCurrentMonth] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // minimum 500ms loading animation
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Combined Filter Effect
    useEffect(() => {
        let filtered = [...allBills];

        // Filter by Category
        if (selectedCategory) {
            filtered = filtered.filter(
                (bill) => bill.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filter by Current Month (When active)
        if (showCurrentMonth) {
            const now = new Date();
            filtered = filtered.filter((bill) => {
                const billDate = new Date(bill.date);
                return (
                    billDate.getMonth() === now.getMonth() &&
                    billDate.getFullYear() === now.getFullYear()
                );
            });
        }

        setBills(filtered);
        setCurrentPage(1); // Reset to page 1 when filters change
    }, [selectedCategory, showCurrentMonth, allBills]);

    // Search filter
    const searchedBills = bills.filter((bill) => {
        const query = searchQuery.toLowerCase();
        return (
            bill.title.toLowerCase().includes(query) ||
            bill.category.toLowerCase().includes(query) ||
            bill.amount.toString().includes(query)
        );
    });

    // Pagination Logic
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchedBills.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchedBills.length / cardsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <h2 className="text-3xl md:text-3xl font-bold text-blue-600 mb-10">
                    All Bills
                </h2>

                {/* Filtering & Search Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 mr-4">

                    {/* Search Bar (LEFT SIDE) */}
                    <div className="relative w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search bills..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                            className="w-full pl-11 pr-4 py-2 rounded-lg bg-white shadow-md border border-blue-300 focus:outline-none text-blue-600 font-semibold"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Controls (RIGHT SIDE) */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowCurrentMonth(!showCurrentMonth)}
                            className={`px-4 py-2 rounded-lg font-bold transition-all shadow-md border ${showCurrentMonth
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            {showCurrentMonth ? "Showing Current Month Bills" : "Click To Show Current Month Bills"}
                        </button>

                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none pl-10 pr-10 py-2 rounded-lg bg-white shadow-md border border-blue-300 focus:outline-none text-blue-600 font-semibold cursor-pointer"
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
                </div>

                {/* Cards grid */}
                {currentCards.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                            {currentCards.map((bill) => (
                                <div
                                    key={bill._id}
                                    className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col h-full w-full max-w-[340px] border border-transparent hover:border-blue-100"
                                >
                                    <div className="w-full h-64 bg-blue-200 rounded-lg overflow-hidden">
                                        <img
                                            src={bill.image || "/default-bill.jpg"}
                                            alt="bill"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-4 flex-grow">
                                        <h3 className="text-lg font-bold text-blue-600 line-clamp-1">{bill.title}</h3>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-700"><strong>Category :</strong> {bill.category}</p>
                                            <p className="text-sm text-gray-700"><strong>Location :</strong> {bill.location}</p>
                                            <p className="text-sm text-gray-700"><strong>Amount :</strong> {bill.amount} BDT</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/bills/${bill._id}`)}
                                        className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm"
                                    >
                                        See Details
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="p-2 rounded-lg border border-blue-300 disabled:opacity-30 text-blue-600 hover:bg-blue-100 transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`w-10 h-10 rounded-lg font-bold transition ${currentPage === index + 1 ? "bg-blue-600 text-white shadow-md" : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-100"}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="p-2 rounded-lg border border-blue-300 disabled:opacity-30 text-blue-600 hover:bg-blue-100 transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </>
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