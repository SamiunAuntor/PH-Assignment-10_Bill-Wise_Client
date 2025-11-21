import React from "react";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
            {/* Big 404 text */}
            <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</h1>

            {/* Message */}
            <p className="text-lg md:text-2xl text-gray-700 mb-8 text-center">
                Oops! The page you are looking for does not exist.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Home
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md shadow-md hover:bg-blue-50 transition-colors duration-300"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Error404Page;
