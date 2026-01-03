import React from 'react';
import { Mail, Send, Phone, User, MessageSquare, AtSign } from 'lucide-react';
import Swal from 'sweetalert2';

const ContactUsPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        // Standard SweetAlert (Matching Profile Update style)
        Swal.fire({
            icon: "success",
            title: "Message Sent",
            text: "Your request has been submitted successfully!",
            timer: 1500,
            showConfirmButton: false
        });

        // Reset form after submission
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-blue-50 w-full pb-20">
            <div className="w-11/12 mx-auto pt-12">

                {/* Page Header */}
                <div className="w-full py-16 px-6 md:px-12 bg-white rounded-2xl border border-slate-200 shadow-sm mb-12">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4 text-left">Contact Us</h1>
                    <p className="text-lg text-slate-600 max-w-3xl">Have questions about BillWise? Reach out to the team directly.</p>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Column 1: Contact Methods */}
                    <div className="space-y-8">
                        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Ways of Contact</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                        <p className="text-lg font-semibold text-slate-800">support@billwise.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Contact</p>
                                        <p className="text-lg font-semibold text-slate-800">012 4587 9632</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">Technical Support</h3>
                            <p className="text-slate-400 leading-relaxed">
                                For API issues, bug reports, or feature requests, please include your User email and browser details for faster troubleshooting.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Message Form */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                            <MessageSquare className="text-blue-600" size={24} />
                            Send a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name</label>
                                    <div className="mt-1 relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input required type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all text-sm" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                                    <div className="mt-1 relative">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input required type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Subject</label>
                                <input required type="text" placeholder="Inquiry about billing history" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all text-sm" />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
                                <textarea required rows="4" placeholder="How can we help you?" className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all text-sm resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex justify-center items-center gap-2 active:scale-95">
                                <Send size={18} /> Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;