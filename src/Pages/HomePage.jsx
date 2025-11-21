import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';
import { useLoaderData } from 'react-router-dom';
import RecentBills from '../Components/RecentBills/RecentBills';
import { LifeLine } from 'react-loading-indicators';

const HomePage = () => {
    const recentBillsData = useLoaderData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure loader shows at least 2s
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" text="" textColor="" />
            </div>
        );
    }

    return (
        <div className='bg-blue-50 min-h-screen'>
            <Banner />
            <CategorySection />
            <RecentBills recentBillsData={recentBillsData} />
        </div>
    );
};

export default HomePage;
