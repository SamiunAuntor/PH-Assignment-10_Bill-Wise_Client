import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LifeLine } from "react-loading-indicators";
import { User, Mail, ShieldCheck, Activity, Calendar, Edit3, Save, X, Clock } from "lucide-react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const MyProfilePage = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const auth = getAuth();

    const [dbUser, setDbUser] = useState(null);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPhotoUrl, setNewPhotoUrl] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Custom Date Formatter: "1 December 2025"
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-GB', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        const loadProfileData = async () => {
            // Use auth.currentUser to ensure we have getIdToken function
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            try {
                const token = await currentUser.getIdToken(true);

                const [billsRes, userRes] = await Promise.all([
                    fetch(`http://localhost:5000/my-bills`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`http://localhost:5000/user-profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);

                const billsData = await billsRes.json();
                const userData = await userRes.json();

                setBills(billsData);
                setDbUser(userData);
                setNewName(userData?.name || currentUser.displayName || "");
                setNewPhotoUrl(userData?.photo || currentUser.photoURL || "");
            } catch (err) {
                console.error("Profile load error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) loadProfileData();
    }, [user, auth.currentUser]);

    const handleUpdate = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return Swal.fire("Error", "Session expired. Please login again.", "error");
        }

        if (!newName || !newPhotoUrl) {
            return Swal.fire("Error", "Name and Photo URL are required", "warning");
        }

        try {
            // 1. Update Firebase (Auth Profile)
            await updateUserProfile(newName, newPhotoUrl);

            // 2. Get fresh token from the real Firebase instance
            const token = await currentUser.getIdToken(true);

            // 3. Update MongoDB
            const response = await fetch('http://localhost:5000/users/update', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: newName, photo: newPhotoUrl })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Update local UI state
                setDbUser(prev => ({
                    ...prev,
                    name: newName,
                    photo: newPhotoUrl,
                    lastUpdatedAt: new Date().toISOString()
                }));
                setIsEditing(false);

                Swal.fire({
                    icon: "success",
                    title: "Profile updated",
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                throw new Error(data.error || "Database update failed");
            }
        } catch (err) {
            console.error("Update error:", err);
            Swal.fire("Error", "Update failed. Try logging out and back in.", "error");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <LifeLine color="#318dcc" size="large" />
        </div>
    );

    const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
    const isBlocked = dbUser?.status?.toLowerCase() === "blocked";

    return (
        <div className="min-h-screen bg-blue-50 py-12">

            {/* Title aligned to the left within the 11/12 width container */}
            <div className="w-11/12 mx-auto">
                <h1 className="text-3xl text-blue-600 font-bold mb-10 text-left">
                    My Profile
                </h1>
            </div>

            <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Profile Card */}
                <div className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center h-fit">
                    <div className="w-full flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={dbUser?.photo || user?.photoURL || "https://i.ibb.co/2Fxq9YH/default.png"}
                                alt="Profile"
                                className="h-40 w-40 rounded-full object-cover ring-4 ring-blue-50 ring-offset-2 mx-auto"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <h1 className="text-2xl font-bold text-slate-800">{dbUser?.name || user?.displayName}</h1>
                            <p className="text-slate-500 flex items-center justify-center gap-2 mt-1">
                                <Mail size={16} /> {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-6"></div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all font-medium"
                        >
                            <Edit3 size={18} /> Edit Profile
                        </button>
                    ) : (
                        <div className="w-full space-y-5 animate-in fade-in duration-300 text-left">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 ml-1">Photo URL</label>
                                <input
                                    type="text"
                                    value={newPhotoUrl}
                                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2">
                                    <Save size={18} /> Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-lg flex items-center justify-center gap-2">
                                    <X size={18} /> Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Details & Stats */}
                <div className="lg:col-span-8 space-y-5 h-fit">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl text-white shadow-lg">
                            <p className="text-blue-100 font-medium">Total Bills Paid</p>
                            <h3 className="text-4xl font-bold mt-2">{bills.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <p className="text-slate-500 font-medium">Total Amount Processed</p>
                            <h3 className="text-4xl font-bold mt-2 text-slate-800">৳{totalAmount.toLocaleString()}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User className="text-blue-600" /> Account Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600"><ShieldCheck /></div>
                                <div>
                                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">User Role</p>
                                    <p className="text-lg font-medium text-slate-800 capitalize">{dbUser?.role || "User"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl ${isBlocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}><Activity /></div>
                                <div>
                                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Account Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 capitalize ${isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {dbUser?.status || "Active"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-50 rounded-2xl text-orange-600"><Calendar /></div>
                                <div>
                                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Joined Date</p>
                                    <p className="text-lg font-medium text-slate-800">{formatDate(dbUser?.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Clock /></div>
                                <div>
                                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Last Profile Update</p>
                                    <p className="text-lg font-medium text-slate-800">
                                        {dbUser?.lastUpdatedAt ? formatDate(dbUser.lastUpdatedAt) : "Never Updated"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;