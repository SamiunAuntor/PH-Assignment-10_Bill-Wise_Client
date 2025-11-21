import React from 'react';

const CategoryCard = ({ title, image }) => {
    return (
        <div className="w-full max-w-[300px] h-72 bg-white rounded-3xl shadow-lg transition-transform hover:shadow-xl hover:-translate-y-2 flex flex-col overflow-hidden">
            
            {/* Image */}
            <div className="h-[90%] p-2">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            {/* Category Title*/}
            <div className="h-[10%] bg-blue-100 text-blue-600 text-center flex items-center justify-center text-sm font-bold">
                {title}
            </div>
        </div>
    );
};

export default CategoryCard;
