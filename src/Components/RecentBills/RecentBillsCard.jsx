import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentBillsCard = ({ bill }) => {
    const navigate = useNavigate();

    return (
        <div
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
    );
};

export default RecentBillsCard;