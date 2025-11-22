// Pages/BillDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { LifeLine } from "react-loading-indicators";
import BillDetails from "../Components/BillDetails";

const BillDetailsPage = () => {
    const bill = useLoaderData();
    const [loading, setLoading] = useState(true);

    // Ensure a minimum 500ms loading animation for smoother UX
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    return (
        <div className="bg-blue-50 min-h-screen py-12">
            <BillDetails bill={bill} />
        </div>
    );
};

export default BillDetailsPage;
