import React from 'react';
import { ShieldCheck, Lock, Key, FileDown, ShieldAlert, Database, EyeOff, Server, Globe, Zap, Users } from 'lucide-react';

const PrivicyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-blue-50 w-full pb-20">
            <div className="w-11/12 mx-auto pt-12">
                {/* Page Header */}
                <div className="w-full py-16 px-6 md:px-12 bg-white rounded-2xl border border-slate-200 shadow-sm mb-12">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-slate-600 max-w-3xl">Our commitment to protecting your utility data and financial privacy.</p>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Column 1: Security Highlights (Dark Card) */}
                    <div className="bg-slate-900 text-white p-10 rounded-2xl h-fit shadow-xl space-y-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                            <Lock size={24} /> Security Infrastructure
                        </h2>

                        <div className="space-y-8">
                            <SecurityPoint
                                icon={<Server className="text-blue-400" />}
                                title="Firebase Verification"
                                desc="Server-side token verification ensures that only authenticated users can access their specific billing history."
                            />
                            <SecurityPoint
                                icon={<Database className="text-blue-400" />}
                                title="MongoDB Atlas"
                                desc="All bill data is stored in encrypted cloud clusters with strictly defined IP access lists and role-based permissions."
                            />
                            <SecurityPoint
                                icon={<Zap className="text-blue-400" />}
                                title="API Security"
                                desc="Axios Interceptors inject secure headers into every request, preventing Cross-Site Request Forgery (CSRF)."
                            />
                            <SecurityPoint
                                icon={<Users className="text-blue-400" />}
                                title="Admin Controls"
                                desc="Role-based access restricts sensitive operations and global data management to authorized administrators only."
                            />
                            <SecurityPoint
                                icon={<EyeOff className="text-blue-400" />}
                                title="Zero-Knowledge Auth"
                                desc="Passwords are managed by Firebase Auth. BillWise never sees or stores your raw password in our own database."
                            />
                        </div>
                    </div>

                    {/* Column 2: Detailed Policy Sections (White Cards) */}
                    <div className="space-y-8">
                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Key size={20} className="text-blue-600" /> Identity Protection
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-justify text-sm md:text-base">
                                We utilize Firebase for all authentication processes. To provide a seamless experience, we store your unique
                                User ID (UID) and email address. This information is used solely to link your bill records to your
                                account and is never shared with third-party advertisers.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Globe size={20} className="text-blue-600" /> Data Collection
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-justify text-sm md:text-base">
                                BillWise collects technical bill details including amounts, utility categories (Electricity, Gas, Water, Internet),
                                and payment status. This data is required for the dashboard visualization and the generation of your
                                downloadable PDF reports.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileDown size={20} className="text-blue-600" /> Your Rights
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-justify text-sm md:text-base">
                                As a BillWise user, you retain full ownership of your data. You have the right to update your bill history
                                or delete individual records at any time from your private dashboard. Furthermore, our PDF export tool
                                ensures you can take your financial history with you whenever you choose.
                            </p>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

const SecurityPoint = ({ icon, title, desc }) => (
    <div className="flex gap-4 border-b border-slate-800 pb-6 last:border-0 last:pb-0">
        <div className="shrink-0 p-2 bg-slate-800 rounded-lg">{icon}</div>
        <div>
            <h3 className="font-bold text-blue-300 mb-1">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default PrivicyPolicyPage;