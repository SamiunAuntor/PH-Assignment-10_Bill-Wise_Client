import React from 'react';

const users = [
    {
        name: "Ayesha Rahman",
        photo: "https://i.ibb.co.com/HT5zNtfG/3.jpg",
        experience: "This platform has made managing my bills so much easier. Very essential! I can now see all my payments in one place and even download detailed reports whenever I want. It saves me so much time and stress."
    },
    {
        name: "Nusrat Jahan",
        photo: "https://i.ibb.co.com/fdWFYRwh/5.jpg",
        experience: "The interface is simple and user-friendly. The dashboard feature is amazing. I love how intuitive everything is, from viewing bills to updating my profile. It really feels tailored to my needs."
    },
    {
        name: "Fatema Akter",
        photo: "https://i.ibb.co.com/Hf1ftXjq/stefan-stefancik-QXev-Dflbl8-A-unsplash.jpg",
        experience: "Now I can easily track all my payments. The PDF report feature is fantastic. I can print or save my bills anytime, which is perfect for personal and official records. Highly recommend it to everyone."
    },
    {
        name: "Rashed Hossain",
        photo: "https://i.ibb.co.com/4ZW5JvrC/user.jpg",
        experience: "Customer service is excellent and the interface is very smooth. Five stars! I have been using it for months now, and it has never failed me. Everything from notifications to updates works perfectly."
    }
];

const WhatOurUsersSay = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl text-blue-600 font-bold text-center mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map((user, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4">

                        {/* First row : name + photo */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                            </div>
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </div>

                        {/* Second row : experience */}
                        <p className="text-gray-600 text-justify">{user.experience}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatOurUsersSay;
