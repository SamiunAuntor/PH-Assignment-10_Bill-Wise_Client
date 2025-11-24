import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LifeLine } from "react-loading-indicators";
import { User } from "lucide-react";
import Swal from "sweetalert2";

const MyProfilePage = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    // photo change state
    const [isChangingPhoto, setIsChangingPhoto] = useState(false);
    const [newPhotoUrl, setNewPhotoUrl] = useState("");

    const fetchBills = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch(`https://bill-wise-server.vercel.app/my-bills?email=${user.email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setBills(data);
        } catch (err) {
            console.error("Error fetching bills:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, [user]);

    // handle photo update
    const handlePhotoUpdate = async () => {
        if (!newPhotoUrl) {
            Swal.fire("Error", "Please enter a valid photo URL", "warning");
            return;
        }

        try {
            // Use AuthProvider's method to update photo
            await updateUserProfile(user.displayName, newPhotoUrl);

            Swal.fire("Success", "Profile photo updated successfully!", "success");

            setIsChangingPhoto(false);
            setNewPhotoUrl("");
        } catch (err) {
            console.error("Photo update error:", err);
            Swal.fire("Error", "Failed to update photo", "error");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    const totalBills = bills.length;
    const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

    return (
        <div className="min-h-screen bg-blue-50 flex justify-center items-start py-12 px-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-8">

                {/* Profile Header */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/2Fxq9YH/default.png"}
                        alt="Profile"
                        className="h-36 w-36 rounded-full object-cover"
                    />
                    <h1 className="text-3xl font-bold text-gray-800">{user?.displayName || "Anonymous User"}</h1>
                    <p className="text-gray-600">{user?.email}</p>

                    {/* Change Photo Section */}
                    {!isChangingPhoto ? (
                        <button
                            onClick={() => setIsChangingPhoto(true)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Change Photo
                        </button>
                    ) : (
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Enter new photo URL"
                                value={newPhotoUrl}
                                onChange={(e) => setNewPhotoUrl(e.target.value)}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePhotoUpdate}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => { setIsChangingPhoto(false); setNewPhotoUrl(""); }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Account Summary */}
                <div className="w-full bg-blue-50 rounded-xl shadow p-6 text-center">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center justify-center gap-2">
                        <User /> Account Summary
                    </h2>
                    <div className="flex justify-around text-center mt-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{totalBills}</h3>
                            <p className="text-gray-500">Total Bills Paid</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">৳{totalAmount.toFixed(2)}</h3>
                            <p className="text-gray-500">Total Amount</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;
