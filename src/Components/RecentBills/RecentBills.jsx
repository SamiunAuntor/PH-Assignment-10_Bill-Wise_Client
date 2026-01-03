import React from 'react';
import RecentBillsCard from './RecentBillsCard';

const RecentBills = ({ recentBillsData }) => {
    return (
        
        <div className="w-11/12 mx-auto mt-12 pb-20"> 
            
            {/* Section Title */}
            <h2 className="text-3xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
                Recent Bills
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {recentBillsData?.map((bill) => (
                    <RecentBillsCard key={bill._id} bill={bill} />
                ))}
            </div>
        </div>
    );
};

export default RecentBills;