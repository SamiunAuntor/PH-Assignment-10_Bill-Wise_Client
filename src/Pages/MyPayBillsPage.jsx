import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LifeLine } from "react-loading-indicators";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const MyPayBillsPage = () => {
    const { user } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    // modal states
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    // PDF generation
    const handleDownloadReport = () => {
        if (!bills || bills.length === 0) {
            Swal.fire("No bills found", "You have no bills to download.", "info");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("My Bills Report", 14, 22);

        const tableColumn = ["Username", "Email", "Amount", "Address", "Phone", "Date"];
        const tableRows = [];

        bills.forEach(bill => {
            const billData = [
                bill.username,
                bill.email,
                `${bill.amount} BDT`,
                bill.address,
                bill.phone,
                bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "N/A"
            ];
            tableRows.push(billData);
        });

        try {
            autoTable(doc, {
                startY: 30,
                head: [tableColumn],
                body: tableRows,
                theme: "grid",
                headStyles: { fillColor: [56, 178, 172] },
            });

            const totalBills = bills.length;
            const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

            const finalY = doc?.lastAutoTable?.finalY || 40;
            doc.text(
                `Total Bills: ${totalBills}    Total Amount: ${totalAmount} BDT`,
                14,
                finalY + 10
            );

            // Trigger download
            doc.save(`my_bills_report_${new Date().toISOString().slice(0, 10)}.pdf`);
        } catch (err) {
            console.error("PDF generation error:", err);
            Swal.fire("Error", "Failed to generate the PDF report. Check console.", "error");
        }
    };

    // form fields
    const [form, setForm] = useState({
        amount: "",
        address: "",
        phone: "",
        createdAt: "",
    });

    // fetch bills
    const fetchBills = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const res = await fetch("http://localhost:5000/my-bills", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setBills(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, [user]);

    // open update modal
    const openUpdateModal = (bill) => {
        setSelectedBill(bill);
        setForm({
            amount: bill.amount,
            address: bill.address,
            phone: bill.phone,
            createdAt: bill.createdAt
                ? new Date(bill.createdAt).toISOString().slice(0, 10)
                : "",
        });
        setEditModalOpen(true);
    };

    // update bill
    const handleUpdate = async () => {
        try {
            const token = await user.getIdToken();

            await fetch(`http://localhost:5000/update-my-bill/${selectedBill._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            setEditModalOpen(false);
            fetchBills();
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // delete bill using Sweet Alert
    const handleDelete = async (bill) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This bill will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = await user.getIdToken();

                    await fetch(`http://localhost:5000/delete-my-bill/${bill._id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    fetchBills();

                    Swal.fire("Deleted!", "The bill has been removed.", "success");
                } catch (err) {
                    console.error("Delete error:", err);
                }
            }
        });
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
        <div className="min-h-screen bg-blue-50 p-4 md:p-10">
            <h1 className="text-3xl text-blue-600 font-bold mb-6 text-center">
                My Paid Bills
            </h1>

            {/* Summary & Download */}
            <div className="mb-6 bg-white shadow p-5 rounded-lg flex flex-col md:flex-row gap-4 md:gap-10 justify-between items-center">
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center text-lg">
                    <p className="font-semibold">
                        Total Bills Paid: <span className="text-blue-600">{totalBills}</span>
                    </p>
                    <p className="font-semibold">
                        Total Amount: <span className="text-green-600">৳{totalAmount}</span>
                    </p>
                </div>

                <button
                    onClick={handleDownloadReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Download Report
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-blue-300 rounded-lg overflow-hidden">
                    <thead className="bg-blue-200 text-gray-700">
                        <tr className="text-center">
                            <th className="border border-blue-300 px-3 py-2">Username</th>
                            <th className="border border-blue-300 px-3 py-2">Email</th>
                            <th className="border border-blue-300 px-3 py-2">Amount</th>
                            <th className="border border-blue-300 px-3 py-2">Address</th>
                            <th className="border border-blue-300 px-3 py-2">Phone</th>
                            <th className="border border-blue-300 px-3 py-2">Payment Date</th>
                            <th className="border border-blue-300 px-3 py-2 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill._id} className="hover:bg-blue-100 text-center">
                                <td className="border border-blue-300 px-3 py-2">{bill.username}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.email}</td>
                                <td className="border border-blue-300 px-3 py-2">৳{bill.amount}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.address}</td>
                                <td className="border border-blue-300 px-3 py-2">{bill.phone}</td>
                                <td className="border border-blue-300 px-3 py-2">
                                    {bill.createdAt
                                        ? new Date(bill.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                <td className=" px-3 py-2 flex justify-center gap-3">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => openUpdateModal(bill)}
                                    >
                                        <Edit size={20} />
                                    </button>

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(bill)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* UPDATE MODAL */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-blue-50 rounded-2xl shadow-xl p-6 w-11/12 max-w-xl relative border border-blue-200">

                        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">
                            Update Bill
                        </h2>

                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 font-bold text-2xl"
                        >
                            &times;
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Amount */}
                            <label className="font-semibold text-blue-700">Amount</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm({ ...form, amount: Number(e.target.value) })
                                }
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />

                            {/* Address */}
                            <label className="font-semibold text-blue-700">Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({ ...form, address: e.target.value })
                                }
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />

                            {/* Phone */}
                            <label className="font-semibold text-blue-700">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />

                            {/* Created At */}
                            <label className="font-semibold text-blue-700">Payment Date</label>
                            <input
                                type="date"
                                value={form.createdAt}
                                onChange={(e) =>
                                    setForm({ ...form, createdAt: e.target.value })
                                }
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            />

                            {/* Update button */}
                            <button
                                onClick={handleUpdate}
                                className="col-span-full w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default MyPayBillsPage;
