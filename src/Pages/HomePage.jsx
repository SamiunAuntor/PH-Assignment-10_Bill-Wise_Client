import React from 'react';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';

const HomePage = () => {
    return (
        <div className='bg-blue-50 min-h-screen'>
            <Banner></Banner>
            <CategorySection></CategorySection>
        </div>
    );
};

export default HomePage;