import { useEffect, useState } from 'react';
import { LifeLine } from 'react-loading-indicators';

const AboutPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure loader shows at least 0.5s
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

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
        <div className="min-h-screen bg-blue-50 p-6 md:p-12">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-8">
                About Utility Bill Management System
            </h1>

            {/* Project Description */}
            <div className="max-w-5xl mx-auto text-gray-700 text-lg space-y-6">
                <p>
                    The <span className="font-semibold">Utility Bill Management System</span> is a modern MERN stack-based web application designed to help users view and manage their monthly utility bills, including Electricity, Gas, Water, and Internet.
                </p>

                <p>
                    Users can securely log in, view their pending bills, pay bills for the current month only, and even update their paid bills. The system ensures that each user's data is private, safe, and accessible only to them.
                </p>

                <p>
                    Key features include a responsive design, search and filter functionality for bills, and PDF report downloads of a user’s paid bill history. This makes managing household utilities easier and more organized.
                </p>

                {/* Features Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Key Features</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Secure user authentication (Email & Google Login)</li>
                        <li>View and filter utility bills by category</li>
                        <li>Pay bills only for the current month</li>
                        <li>Update your paid bills details</li>
                        <li>Download your billing history as PDF reports</li>
                        <li>Dynamic routing with React Router for smooth navigation</li>
                        <li>Responsive UI for mobile, tablet, and desktop screens</li>
                        <li>Interactive notifications using toast and SweetAlert</li>
                    </ul>
                </div>

                {/* Technology Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Technology Stack</h2>
                    <p>
                        This project is built using the <span className="font-semibold">MERN stack</span>:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>MongoDB:</strong> Database for storing bills and user payments</li>
                        <li><strong>Express.js:</strong> Server-side framework</li>
                        <li><strong>React.js:</strong> Frontend UI with dynamic routing</li>
                        <li><strong>Node.js:</strong> Backend runtime environment</li>
                        <li><strong>Tailwind CSS & DaisyUI:</strong> Styling and responsive design</li>
                    </ul>
                </div>

                {/* Why Use This App */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose This System?</h2>
                    <p className="text-gray-700">
                        Managing multiple utility bills can be tedious. This system simplifies bill management by centralizing all your utility bills in one place, giving you control over payments and tracking your expenses efficiently. It ensures data privacy and provides quick access to reports.
                    </p>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <p className="text-lg font-semibold text-blue-700">
                        Start managing your bills efficiently today!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
