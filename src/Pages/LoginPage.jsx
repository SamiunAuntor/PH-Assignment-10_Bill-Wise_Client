import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../AuthProvider/firebase.config";
import googleIcon from "../assets/google.png";
import { toast } from 'react-hot-toast';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const result = await signIn(email, password);
            const user = result.user;
            const displayName = user.displayName || user.email?.split('@')[0] || 'User';
            toast.success(`Welcome ${displayName}! ✅`);
            await new Promise(resolve => setTimeout(resolve, 100));
            navigate(from, { replace: true });

        } catch (err) {
            // Use friendly error messages
            let message;
            switch (err.code) {
                case "auth/invalid-email":
                    message = "Please enter a valid email address.";
                    break;
                case "auth/user-not-found":
                    message = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    message = "Incorrect password. Please try again.";
                    break;
                default:
                    message = "Login failed. Please try again.";
            }
            toast.error(message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const displayName = user.displayName || user.email?.split('@')[0] || 'User';
            toast.success(`Welcome ${displayName}! ✅`);
            await new Promise(resolve => setTimeout(resolve, 100));
            navigate(from, { replace: true });
            
        } catch (err) {
            let message;
            switch (err.code) {
                case "auth/popup-closed-by-user":
                    message = "Google login was cancelled.";
                    break;
                default:
                    message = "Google login failed. Please try again.";
            }
            toast.error(message);
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-blue-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.15)]">

                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-gray-800 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-gray-800 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2 mt-1 pr-10 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-600 text-white py-2 font-semibold rounded-md hover:bg-blue-700 transition-all">
                        Login
                    </button>
                </form>

                <div className="text-right mt-2">
                    <Link to="/forgot-password" state={{ email: formData.email }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Forgot Password?
                    </Link>
                </div>

                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-gray-300"></span>
                    <span className="px-3 text-gray-500">OR</span>
                    <span className="flex-1 h-px bg-gray-300"></span>
                </div>

                <button onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-blue-300 py-2 rounded-md hover:bg-blue-50 transition-all">
                    <img className="h-5 w-5" src={googleIcon} alt="" />
                    <span className="text-blue-600 font-medium">Continue with Google</span>
                </button>

                <p className="text-sm text-center text-gray-700 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
