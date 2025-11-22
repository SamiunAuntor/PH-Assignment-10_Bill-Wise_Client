// Components/BillDetails.jsx
import React from "react";

const BillDetails = ({ bill }) => {
    if (!bill) return null;

    const billDate = new Date(bill.date);
    const now = new Date();

    const isCurrentMonth =
        billDate.getMonth() === now.getMonth() &&
        billDate.getFullYear() === now.getFullYear();

    return (
        <div className="w-11/12 mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">

            {/* Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* LEFT : Image */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden">
                    <img
                        src={bill.image || "/default-bill.jpg"}
                        alt="Bill"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* RIGHT : All content */}
                <div>
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-blue-700 mb-4">
                        {bill.title}
                    </h1>

                    {/* Info Section */}
                    <div className="space-y-2 text-gray-700 text-lg">
                        <p><strong>Category:</strong> {bill.category}</p>
                        <p><strong>Location:</strong> {bill.location}</p>
                        <p><strong>Amount:</strong> {bill.amount} BDT</p>
                        <p><strong>Date:</strong> {bill.date}</p>
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-gray-500 text-md leading-relaxed">
                        {bill.description || "No description available."}
                    </p>

                    {/* Pay Bill Button */}
                    <button
                        disabled={!isCurrentMonth}
                        className={`mt-8 w-full py-3 rounded-lg font-semibold text-white 
                            ${isCurrentMonth
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {isCurrentMonth ? "Pay Bill" : "You can only pay current month bills"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BillDetails;
