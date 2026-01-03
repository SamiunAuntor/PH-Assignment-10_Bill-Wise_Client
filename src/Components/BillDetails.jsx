import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const BillDetails = ({ bill }) => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [alreadyPaid, setAlreadyPaid] = useState(false);

    // Check if user already paid this bill
    useEffect(() => {
        if (!user?.email || !bill?._id) return;

        async function checkPaid() {
            try {
                const res = await fetch(`http://localhost:5000/my-bills?email=${user.email}`);
                const data = await res.json();
                if (data.some(b => b.billId === bill._id)) setAlreadyPaid(true);
            } catch (err) {
                console.error("Error checking payment:", err);
            }
        }

        checkPaid();
    }, [user?.email, bill?._id]);

    if (!bill) return null;

    const billDate = new Date(bill.date);
    const now = new Date();

    const isCurrentMonth =
        billDate.getMonth() === now.getMonth() &&
        billDate.getFullYear() === now.getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        // client-side phone validation
        if (!/^\d{11}$/.test(phone)) {
            toast.error("Phone number must be 11 digits");
            return;
        }

        setSubmitting(true);

        const payload = {
            email: user?.email || "",
            billId: bill._id,
            amount: bill.amount,
            username,
            address,
            phone,
            date: new Date().toLocaleDateString(),
            additionalInfo,
        };

        try {
            const res = await fetch("http://localhost:5000/add-my-bill", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Payment failed");

            toast.success(data?.message || "Payment submitted successfully");
            setAlreadyPaid(true);
            setIsModalOpen(false);
            setUsername("");
            setAddress("");
            setPhone("");
            setAdditionalInfo("");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Payment failed. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-11/12 mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 mt-6 border border-gray-100">
            {/* Top Section: Photo and Stats */}
            <div className="flex flex-col md:flex-row gap-10 items-stretch">

                {/* LEFT: Photo */}
                <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-md border border-gray-100">
                    <img
                        src={bill.image || "/default-bill.jpg"}
                        alt="Bill"
                        className="w-full h-full object-contain bg-gray-50 transform hover:scale-105 transition duration-500"
                    />
                </div>

                {/* RIGHT: Stats and Action Button */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 pb-4">
                        {bill.title}
                    </h1>

                    <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <span className="font-bold text-blue-700 min-w-[100px]">Category :</span>
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full uppercase tracking-wider">
                                {bill.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition border-b border-gray-100">
                            <span className="font-bold text-gray-600 min-w-[100px]">Location :</span>
                            <span className="text-gray-800 font-medium">{bill.location}</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition border-b border-gray-100">
                            <span className="font-bold text-gray-600 min-w-[100px]">Amount :</span>
                            <span className="text-2xl font-black text-blue-600">{bill.amount} <small className="text-sm font-bold text-gray-500">BDT</small></span>
                        </div>

                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition border-b border-gray-100">
                            <span className="font-bold text-gray-600 min-w-[100px]">Bill Date :</span>
                            <span className="text-gray-800 font-medium">{bill.date}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-10">
                        <button
                            disabled={!isCurrentMonth || alreadyPaid}
                            onClick={() => setIsModalOpen(true)}
                            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-lg 
                                ${isCurrentMonth && !alreadyPaid
                                    ? "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {alreadyPaid
                                ? "Bill Already Paid"
                                : isCurrentMonth
                                    ? "Pay Bill"
                                    : "You can only pay current month bills"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Description */}
            <div className="mt-12 pt-8 border-t-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    Description
                </h3>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line text-justify">
                        {bill.description || "No description available."}
                    </p>
                </div>
            </div>

            {/* Modal Logic */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative border border-blue-100 animate-in zoom-in duration-200">
                        <h2 className="text-3xl font-black text-blue-700 mb-6 text-center">Complete Payment</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-blue-700 transition-colors text-3xl"
                        >
                            &times;
                        </button>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Email</label>
                                <input type="email" value={user?.email || ""} readOnly className="px-4 py-3 border border-gray-200 rounded-xl bg-blue-50 text-gray-500 w-full outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Bill ID</label>
                                <input type="text" value={bill._id} readOnly className="px-4 py-3 border border-gray-200 rounded-xl bg-blue-50 text-gray-500 w-full outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Amount</label>
                                <input type="text" value={`${bill.amount} BDT`} readOnly className="px-4 py-3 border border-gray-200 rounded-xl bg-blue-50 text-blue-700 font-bold w-full outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter name" className="px-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-600 outline-none transition" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" className="px-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-600 outline-none transition" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Phone</label>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-bold text-sm">+88</span>
                                    <input type="text" value={phone} onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); if (val.length <= 11) setPhone(val); }} placeholder="11 digits" className="px-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-600 outline-none transition" required />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold uppercase text-blue-600 ml-1">Additional Info</label>
                                <textarea rows="2" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Optional notes..." className="px-4 py-3 border border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-600 outline-none transition resize-none"></textarea>
                            </div>
                            <button type="submit" disabled={submitting} className={`md:col-span-2 py-4 mt-2 rounded-2xl font-bold text-white text-lg transition shadow-lg ${submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}>
                                {submitting ? "Submitting..." : "Submit Payment"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default BillDetails;
