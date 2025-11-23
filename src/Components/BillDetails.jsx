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
        <div className="w-11/12 mx-auto bg-white shadow-lg rounded-2xl p-6 mt-0">

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                <div className="w-full h-[320px] md:h-[550px] rounded-xl overflow-hidden">
                    <img
                        src={bill.image || "/default-bill.jpg"}
                        alt="Bill"
                        className="w-full h-full object-cover"
                    />
                </div>



                {/* RIGHT: Content */}
                <div>
                    <h1 className="text-3xl font-bold text-blue-700 mb-4">{bill.title}</h1>

                    <div className="space-y-2 text-gray-700 text-lg">
                        <p><strong>Category:</strong> {bill.category}</p>
                        <p><strong>Location:</strong> {bill.location}</p>
                        <p><strong>Amount:</strong> {bill.amount} BDT</p>
                        <p><strong>Date:</strong> {bill.date}</p>
                    </div>

                    <p className="mt-6 text-gray-500 text-md leading-relaxed text-justify">
                        {bill.description || "No description available."}
                    </p>


                    <button
                        disabled={!isCurrentMonth || alreadyPaid}
                        onClick={() => setIsModalOpen(true)}
                        className={`mt-8 w-full py-3 rounded-lg font-semibold text-white 
                            ${isCurrentMonth && !alreadyPaid
                                ? "bg-blue-600 hover:bg-blue-700"
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-blue-50 rounded-2xl shadow-xl p-6 w-11/12 max-w-2xl relative border border-blue-200">

                        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">Pay Bill</h2>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 font-bold text-2xl"
                        >
                            &times;
                        </button>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg bg-blue-100 text-gray-700 w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Bill ID</label>
                                <input
                                    type="text"
                                    value={bill._id}
                                    readOnly
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg bg-blue-100 text-gray-700 w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Amount</label>
                                <input
                                    type="text"
                                    value={bill.amount}
                                    readOnly
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg bg-blue-100 text-gray-700 w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your Name"
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Your Address"
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Phone</label>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg text-blue-700 font-medium">+88</span>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length <= 11) setPhone(val);
                                        }}
                                        placeholder="11-digit number"
                                        className="px-4 py-2 border border-blue-300 rounded-lg w-full
                                       focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Enter 11 digits after +88</p>
                            </div>

                            <div className="col-span-1">
                                <label className="text-sm font-semibold text-blue-700">Date</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleDateString()}
                                    readOnly
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg bg-blue-100 text-gray-700 w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold text-blue-700">Additional Info</label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    placeholder="Optional notes..."
                                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg w-full
                                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                                ></textarea>
                            </div>

                            <div className="col-span-1 md:col-span-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition 
                            ${submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
                                >
                                    {submitting ? "Submitting..." : "Submit Payment"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BillDetails;
