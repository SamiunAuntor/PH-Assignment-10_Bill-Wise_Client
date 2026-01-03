import React from 'react';
import CategoryCard from './CategoryCard';


// Sample category data
const categories = [
    {
        title: "Electricity",
        image: "https://i.ibb.co/BHDLGVBZ/electricity.png",
    },
    {
        title: "Gas",
        image: "https://i.ibb.co/21r0w7fT/gas.jpg",
    },
    {
        title: "Water",
        image: "https://i.ibb.co/wNnWrqZ9/water.png",
    },
    {
        title: "Internet",
        image: "https://i.ibb.co/Zzhch1t9/internet.png",
    },
];

const CategorySection = () => {
    return (
        <div className="w-11/12 mx-auto py-10 pt-20 pb-20">
            <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
                Bill <span className='text-blue-500'>Categories</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                {categories.map((cat, index) => (
                    <CategoryCard key={index} title={cat.title} image={cat.image} />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
