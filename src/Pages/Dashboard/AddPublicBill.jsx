import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const AddPublicBill = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        title: '',
        category: '',
        email: 'admin@gmail.com',
        location: '',
        description: '',
        image: '',
        date: '',
        amount: ''
    });
    const [loading, setLoading] = useState(false);

    // Map categories to your specific image links
    const categoryImages = {
        Electricity: "https://i.ibb.co.com/BHDLGVBZ/electricity.png",
        Gas: "https://i.ibb.co.com/21r0w7fT/gas.jpg",
        Internet: "https://i.ibb.co.com/Zzhch1t9/internet.png",
        Water: "https://i.ibb.co.com/wNnWrqZ9/water.png"
    };

    // Auto-update image URL when category changes
    useEffect(() => {
        if (form.category && categoryImages[form.category]) {
            setForm(prev => ({ ...prev, image: categoryImages[form.category] }));
        }
    }, [form.category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.category || !form.amount || !form.date) {
            Swal.fire('Error', 'Please fill in all required fields (Title, Category, Amount, Date)', 'warning');
            return;
        }

        setLoading(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch('http://localhost:5000/admin/add-public-bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'Public bill added successfully!',
                    icon: 'success',
                    confirmButtonColor: '#2563eb'
                });
                setForm({
                    title: '',
                    category: '',
                    email: 'admin@billwise.com',
                    location: '',
                    description: '',
                    image: '',
                    date: '',
                    amount: ''
                });
            } else {
                throw new Error(data.error || 'Failed to add bill');
            }
        } catch (err) {
            console.error('Add error:', err);
            Swal.fire('Error', err.message || 'Failed to add public bill', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-blue-700 mb-2">Add Public Bill</h1>
                <p className="text-gray-500 font-medium">Create a new bill for the public listing marketplace.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Bill Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g., Monthly Residential Electricity Bill - Jan 2026"
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-semibold text-blue-600 cursor-pointer"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Gas">Gas</option>
                                <option value="Water">Water</option>
                                <option value="Internet">Internet</option>
                            </select>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Amount (BDT) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                required
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value === "" ? "" : Number(e.target.value) })}
                                placeholder="4500"
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Location
                            </label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                placeholder="e.g., Gulshan-2, Dhaka"
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Bill Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                required
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        {/* Image Preview (Read Only) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Assigned Category Image
                            </label>
                            <div className="flex items-center gap-4 p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50">
                                {form.image ? (
                                    <>
                                        <img src={form.image} alt="Preview" className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-blue-100" />
                                        <span className="text-xs font-mono text-blue-400 break-all">{form.image}</span>
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-400 italic">Select a category to auto-assign an image.</span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                Description
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Enter detailed bill description..."
                                rows="4"
                                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={22} />
                            {loading ? 'Processing...' : 'Publish Public Bill'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPublicBill;