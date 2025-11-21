import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-[0_2px_10px_rgba(59,130,246,0.15)]">
            <div className="w-11/12 mx-auto flex justify-between items-center py-3">

                {/* Logo → Home */}
                <Link to="/">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                        BillWise
                    </h1>
                </Link>

                {/* Mobile Hamburger */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/bills"
                        className={({ isActive }) =>
                            `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                        }
                    >
                        Bills
                    </NavLink>

                    {/* Login Button */}
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `px-4 py-2 border border-blue-600 rounded-md cursor-pointer text-center transition 
              ${isActive ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50"}`
                        }
                    >
                        Login
                    </NavLink>

                    {/* Register Button */}
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-md cursor-pointer text-center transition 
              ${isActive ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`
                        }
                    >
                        Register
                    </NavLink>
                </ul>
            </div>

            {/* Mobile Menu */}
            {open && (
                <ul className="md:hidden flex flex-col w-11/12 mx-auto bg-white pb-3 rounded-md shadow-[0_4px_12px_rgba(59,130,246,0.15)] justify-center items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `w-full py-2 border-b border-gray-200 text-center hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/bills"
                        className={({ isActive }) =>
                            `w-full py-2 border-b border-gray-200 text-center hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Bills
                    </NavLink>

                    {/* Login Button */}
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `w-full mt-3 px-4 py-2 border border-blue-600 rounded-md text-center transition 
              ${isActive ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50"}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Login
                    </NavLink>

                    {/* Register Button */}
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `w-full mt-2 px-4 py-2 rounded-md text-center transition 
              ${isActive ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`
                        }
                        onClick={() => setOpen(false)}
                    >
                        Register
                    </NavLink>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
