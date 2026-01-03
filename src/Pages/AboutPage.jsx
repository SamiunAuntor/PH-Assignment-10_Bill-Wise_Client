import React, { useEffect } from 'react';
import {
    Database, ShieldCheck, FileText, Smartphone, Layout, Users, Zap, Search,
    Bell, Moon, RefreshCw, Layers, CreditCard, Code, Server, CheckCircle,
    Loader2, PlayCircle
} from 'lucide-react';

const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 w-full pb-20">
            <div className="w-11/12 mx-auto pt-12">
                {/* Page Header */}
                <div className="w-full py-16 px-6 md:px-12 bg-white rounded-2xl border border-slate-200 shadow-sm mb-12">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">About BillWise</h1>
                    <p className="text-lg text-slate-600 max-w-3xl">A professional MERN-stack ecosystem for streamlined utility bill management.</p>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column 1: Expanded Purpose & Tools */}
                    <div className="space-y-12">
                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">Our Purpose</h2>
                            <div className="space-y-4 text-slate-700 text-justify leading-relaxed text-base">
                                <p>
                                    BillWise was engineered to solve a common household friction: the fragmented nature of utility bill management.
                                    In a modern environment where electricity, gas, water, and internet services often use disparate tracking systems,
                                    BillWise provides a unified Single Page Application (SPA) to centralize every transaction.
                                </p>
                                <p>
                                    Beyond just a tracking tool, BillWise acts as a secure digital vault for financial utility history.
                                    It leverages a high-performance MERN architecture to ensure that whether you are checking for power outages
                                    in Mirpur-10 or generating a year-end expense report, the experience is instantaneous and secure.
                                </p>
                                <p>
                                    The platform is built with a commitment to data integrity, utilizing role-based access to protect sensitive
                                    user information while providing administrators the necessary tools to maintain the global utility database.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tools & Technologies</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <Tool item="React 19" />
                                <Tool item="Vite 7" />
                                <Tool item="Node.js" />
                                <Tool item="Express.js" />
                                <Tool item="MongoDB" />
                                <Tool item="Firebase" />
                                <Tool item="Tailwind CSS" />
                                <Tool item="DaisyUI" />
                                <Tool item="Axios" />
                                <Tool item="jsPDF" />
                                <Tool item="Lottie React" />
                                <Tool item="SweetAlert2" />
                            </div>
                        </section>
                    </div>

                    {/* Column 2: The 12 Core Features Grid */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">System Capabilities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
                            <Feature
                                icon={<ShieldCheck size={20} />}
                                title="Authentication"
                                desc="Secure login/register with email/password and Google OAuth integration."
                            />
                            <Feature
                                icon={<CreditCard size={20} />}
                                title="Bill Management"
                                desc="Full CRUD capabilities to view, pay, and update bills across all utility types."
                            />
                            <Feature
                                icon={<Layers size={20} />}
                                title="Dynamic Routing"
                                desc="React Router implementation for seamless public and private route protection."
                            />
                            <Feature
                                icon={<FileText size={20} />}
                                title="PDF Downloads"
                                desc="Export your paid bills into professional PDF reports via jsPDF and AutoTable."
                            />
                            <Feature
                                icon={<Search size={20} />}
                                title="Category Filtering"
                                desc="Efficient backend query support to filter bills by Electricity, Gas, Water, or Internet."
                            />
                            <Feature
                                icon={<Smartphone size={20} />}
                                title="Responsive UI"
                                desc="Optimized layout for a consistent experience on mobile, tablet, and desktop devices."
                            />
                            <Feature
                                icon={<Bell size={20} />}
                                title="Toast & SweetAlert"
                                desc="Modern, non-intrusive notifications for every success, error, or system action."
                            />
                            <Feature
                                icon={<Loader2 size={20} />}
                                title="Loading Spinners"
                                desc="Smooth visual feedback during API calls to ensure a polished user experience."
                            />
                            <Feature
                                icon={<Moon size={20} />}
                                title="Theme Toggle"
                                desc="Dark and Light mode switching available directly on the homepage."
                            />
                            <Feature
                                icon={<Layout size={20} />}
                                title="Extra Pages"
                                desc="Complete ecosystem including Profile management, About, and 404 error pages."
                            />
                            <Feature
                                icon={<PlayCircle size={20} />}
                                title="Home Animations"
                                desc="Engaging UI effects using Lottie and React Awesome Reveal for modern presentation."
                            />
                            <Feature
                                icon={<RefreshCw size={20} />}
                                title="Axios Interceptors"
                                desc="Secure API communication with automated header injection for all requests."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tool = ({ item }) => (
    <div className="flex items-center gap-2 px-3 py-2 border rounded bg-slate-50 text-xs font-bold text-slate-600">
        <CheckCircle size={12} className="text-blue-500" />
        {item}
    </div>
);

const Feature = ({ icon, title, desc }) => (
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-blue-600 font-bold">
            <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
            <span className="text-slate-900">{title}</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;