import React from 'react';
import { Home, Info, Mail, Facebook, Instagram, MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import xLogo from "../assets/x-logo.png";

const Footer = () => {
    return (
        <footer className="w-full bg-white shadow-[0_-2px_10px_rgba(59,130,246,0.1)]">
            <div className="w-11/12 mx-auto py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Left: Logo & Description */}
                <div className="flex flex-col gap-3 items-center md:items-start">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Home size={28} className="text-blue-600" />
                        <h1 className="text-2xl font-bold text-blue-600">BillWise</h1>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Your ultimate utility bill management solution. Track, pay, and manage all your bills in one place.
                    </p>
                </div>

                {/* Middle: Useful Links */}
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h2 className="text-blue-600 font-semibold mb-2">Useful Links</h2>
                    <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                        <Home size={16} /> Home
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                        <Info size={16} /> About
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                        <Mail size={16} /> Contact
                    </Link>
                    <Link to="/privacy" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                        <Shield size={16} /> Privacy Policy
                    </Link>
                </div>

                {/* Right: Follow Us */}
                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h2 className="text-blue-600 font-semibold mb-2">Follow Us</h2>
                    <div className="flex items-center gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src={xLogo} alt="Twitter" className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                            className="text-[#4267B2] hover:text-blue-700">
                            <Facebook size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="text-[#C13584] hover:text-pink-600">
                            <Instagram size={24} />
                        </a>
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                            className="text-[#25D366] hover:text-green-600">
                            <MessageCircle size={24} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom copyright */}
            <div className="w-full border-t border-gray-200 mt-6 py-4 text-center md:text-center text-gray-400 text-xs">
                © {new Date().getFullYear()} BillWise. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
