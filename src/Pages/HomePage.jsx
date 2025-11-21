import React from 'react';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';
import { useLoaderData } from 'react-router-dom';
import RecentBills from '../Components/RecentBills/RecentBills';

const HomePage = () => {

    const recentBillsData = useLoaderData();

    return (
        <div className='bg-blue-50 min-h-screen'>
            <Banner></Banner>
            <CategorySection></CategorySection>
            <RecentBills recentBillsData={recentBillsData}></RecentBills>
        </div>
    );
};

export default HomePage;