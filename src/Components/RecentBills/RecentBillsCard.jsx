import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentBillsCard = ({ bill }) => {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-full max-w-[340px] bg-blue-100 rounded-xl p-5 shadow-md 
                       overflow-hidden cursor-pointer hover:bg-blue-200 hover:shadow-lg 
                       transition-all duration-1000 group"
        >
            {/* Text Content */}
            <div className="relative z-10 flex flex-col gap-2">
                <p className="text-[#262626] text-lg font-bold">{bill.title}</p>
                <p className="text-[#262626] text-sm">
                    <strong>Category:</strong> {bill.category}
                </p>
                <p className="text-[#262626] text-sm">
                    <strong>Location:</strong> {bill.location}
                </p>
                <p className="text-[#262626] text-sm">
                    <strong>Date:</strong> {bill.date}
                </p>
            </div>

            {/* See Details Button */}
            <button
                onClick={() => navigate(`/bills/${bill._id}`)}
                className="mt-4 w-full bg-blue-600 text-white font-semibold text-sm px-4 py-2 
                           rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-500"
            >
                See Details
            </button>
        </div>
    );
};

export default RecentBillsCard;
