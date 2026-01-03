import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully!");
        } catch (err) {
            toast.error("Failed to log out. Try again.");
        }
    };

    return (
        <nav className="w-full bg-white shadow-[0_2px_10px_rgba(59,130,246,0.15)]">
            <div className="w-11/12 mx-auto flex justify-between items-center py-3">

                {/* Logo */}
                <Link to="/">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                        BillWise
                    </h1>
                </Link>

                {/* Mobile toggle */}
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

                    {/* About - Public Route */}
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                        }
                    >
                        About
                    </NavLink>

                    {/* Only logged in */}
                    {user && (
                        <>
                            <NavLink
                                to="/my-pay-bills"
                                className={({ isActive }) =>
                                    `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                                }
                            >
                                My Pay Bills
                            </NavLink>

                            {/* Added My Profile link */}
                            <NavLink
                                to="/my-profile"
                                className={({ isActive }) =>
                                    `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""}`
                                }
                            >
                                My Profile
                            </NavLink>
                        </>
                    )}

                    {/* Not logged in → Login + Register */}
                    {!user && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `px-4 py-2 border border-blue-600 rounded-md cursor-pointer text-center transition 
                                    ${isActive ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50"}`
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md cursor-pointer text-center transition 
                                    ${isActive ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    {/* Logged in → Avatar + Logout */}
                    {user && (
                        <>
                            <img
                                src={user.photoURL || "https://i.ibb.co/2Fxq9YH/default.png"}
                                alt="profile"
                                className="h-10 w-10 rounded-full object-cover ring-1 ring-blue-50 ring-offset-2 mx-auto"
                            />

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-red-600 text-red-600 rounded-md transition font-medium
                                hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            {open && (
                <ul className="md:hidden flex flex-col w-11/12 mx-auto bg-white pb-3 rounded-md shadow-[0_4px_12px_rgba(59,130,246,0.15)] justify-center items-center">
                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="w-full py-2 border-b border-gray-200 text-center hover:text-blue-600"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/bills"
                        onClick={() => setOpen(false)}
                        className="w-full py-2 border-b border-gray-200 text-center hover:text-blue-600"
                    >
                        Bills
                    </NavLink>

                    {/* About */}
                    <NavLink
                        to="/about"
                        onClick={() => setOpen(false)}
                        className="w-full py-2 border-b border-gray-200 text-center hover:text-blue-600"
                    >
                        About
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/my-pay-bills"
                                onClick={() => setOpen(false)}
                                className="w-full py-2 border-b border-gray-200 text-center hover:text-blue-600"
                            >
                                My Pay Bills
                            </NavLink>

                            {/* My Profile for mobile */}
                            <NavLink
                                to="/my-profile"
                                onClick={() => setOpen(false)}
                                className="w-full py-2 border-b border-gray-200 text-center hover:text-blue-600"
                            >
                                My Profile
                            </NavLink>
                        </>
                    )}

                    {!user && (
                        <>
                            <NavLink
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="w-full mt-3 px-4 py-2 border border-blue-600 rounded-md text-center text-blue-600 hover:bg-blue-50"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                onClick={() => setOpen(false)}
                                className="w-full mt-2 px-4 py-2 rounded-md text-center bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    {user && (
                        <div className="w-full flex flex-col items-center mt-3">
                            <img
                                src={user.photoURL || "https://i.ibb.co/2Fxq9YH/default.png"}
                                className="h-12 w-12 rounded-full mb-2"
                            />

                            <button
                                onClick={() => { setOpen(false); handleLogout(); }}
                                className="px-4 py-2 border border-red-600 rounded-md text-red-600 hover:bg-red-50 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
