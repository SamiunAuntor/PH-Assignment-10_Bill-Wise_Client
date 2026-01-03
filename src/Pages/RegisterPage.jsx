import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile, GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../AuthProvider/firebase.config";
import googleIcon from "../assets/google.png";
import { toast } from 'react-hot-toast';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
    const { signUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        if (!password) return "";
        if (password.length < 6) return "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        return "";
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        const passwordError = validatePassword(password);
        if (passwordError) return toast.error(passwordError);

        try {
            // STEP 1 : Check if the email is already blocked in our DB
            const checkRes = await fetch(`http://localhost:5000/users/check-status?email=${email}`);
            const statusData = await checkRes.json();

            if (statusData?.status === "blocked") {
                toast.error("This email is blocked and cannot be used for registration. 🚫");
                return;
            }

            // STEP 2 : Firebase Registration
            const result = await signUp(email, password);
            await updateProfile(result.user, { displayName: name, photoURL: photo });

            // STEP 3: Save User to DB
            const userInfo = {
                name, email, photo,
                role: "user",
                status: "active",
                createdAt: new Date(),
                lastUpdatedAt: null
            };

            const saveRes = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userInfo)
            });

            const data = await saveRes.json();

            if (data.insertedId || data._id) {
                toast.success(`Welcome to BillWise, ${name}! ✅`);
                navigate("/");
            }

        } catch (err) {
            let message = "Registration failed.";
            if (err.code === "auth/email-already-in-use") message = "Email already registered.";
            toast.error(message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // STEP 1 : Check status in DB immediately after popup
            const checkRes = await fetch(`http://localhost:5000/users/check-status?email=${user.email}`);
            const statusData = await checkRes.json();

            if (statusData?.status === "blocked") {
                await auth.signOut(); // Kick them out of Firebase session
                toast.error("This account is blocked and cannot access the system. 🚫");
                return;
            }

            // STEP 2 : Sync with DB (Ensure user exists in MongoDB)
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "user",
                status: "active",
                createdAt: new Date(),
                lastUpdatedAt: null
            };

            const res = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userInfo)
            });

            await res.json(); // Finalize DB sync

            toast.success(`Successfully logged in as ${user.displayName}! ✅`);
            navigate(from, { replace: true });

        } catch (err) {
            console.error(err);
            toast.error("Google authentication failed. Please try again.");
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-blue-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.15)]">

                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSignUp} className="space-y-4">

                    <div>
                        <label className="text-gray-800 font-medium">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" required
                            className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="text-gray-800 font-medium">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" required
                            className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="text-gray-800 font-medium">Photo URL</label>
                        <input type="text" name="photo" placeholder="Profile image url"
                            className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="text-gray-800 font-medium">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password"
                                placeholder="Enter a strong password"
                                onChange={(e) => setErrorMessage(validatePassword(e.target.value))}
                                required
                                className="w-full px-4 py-2 mt-1 pr-10 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                        {errorMessage && <p className="text-xs text-red-600 mt-1">{errorMessage}</p>}
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-600 text-white py-2 font-semibold rounded-md hover:bg-blue-700 transition-all">
                        Register
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-gray-300"></span>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <span className="flex-1 h-px bg-gray-300"></span>
                </div>

                <button onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-3 border border-blue-300 py-2 rounded-md hover:bg-blue-50 transition-all">
                    <img className="h-5 w-5" src={googleIcon} alt="" />
                    <span className="text-blue-600 font-medium">Continue with Google</span>
                </button>

                <p className="text-sm text-center text-gray-700 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignUp;
