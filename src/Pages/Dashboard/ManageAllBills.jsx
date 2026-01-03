import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { LifeLine } from 'react-loading-indicators';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Edit, Trash2, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageAllBills = () => {
    const { user } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const itemsPerPage = 10;

    const [form, setForm] = useState({
        amount: '',
        address: '',
        phone: '',
        createdAt: '',
    });

    const [publicBillForm, setPublicBillForm] = useState({
        title: '',
        category: '',
        email: '',
        location: '',
        description: '',
        image: '',
        date: '',
        amount: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBills();
    }, []);

    useEffect(() => {
        filterAndSortBills();
    }, [searchTerm, sortBy, sortOrder, bills]);

    const fetchBills = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const res = await fetch('https://bill-wise-server.vercel.app/admin/all-bills', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setBills(data);
        } catch (err) {
            console.error('Error fetching bills:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortBills = () => {
        let filtered = [...bills];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (bill) =>
                    bill.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    bill.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    bill.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    bill.phone?.includes(searchTerm)
            );
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'amount':
                    aValue = a.amount || 0;
                    bValue = b.amount || 0;
                    break;
                case 'date':
                    aValue = new Date(a.createdAt || 0).getTime();
                    bValue = new Date(b.createdAt || 0).getTime();
                    break;
                case 'username':
                    aValue = (a.username || '').toLowerCase();
                    bValue = (b.username || '').toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredBills(filtered);
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const openUpdateModal = (bill) => {
        setSelectedBill(bill);
        setForm({
            amount: bill.amount,
            address: bill.address || '',
            phone: bill.phone || '',
            createdAt: bill.createdAt
                ? new Date(bill.createdAt).toISOString().slice(0, 10)
                : '',
        });
        setEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!/^\d{11}$/.test(form.phone)) {
            Swal.fire("Invalid Phone", "Phone number must be exactly 11 digits.", "warning");
            return;
        }

        try {
            const token = await user.getIdToken();
            const res = await fetch(`https://bill-wise-server.vercel.app/admin/update-bill/${selectedBill._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                Swal.fire('Success', 'Bill updated successfully!', 'success');
                setEditModalOpen(false);
                fetchBills();
            } else {
                throw new Error('Update failed');
            }
        } catch (err) {
            console.error('Update error:', err);
            Swal.fire('Error', 'Failed to update bill', 'error');
        }
    };

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
                    const res = await fetch(`https://bill-wise-server.vercel.app/admin/delete-bill/${bill._id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (res.ok) {
                        Swal.fire('Deleted!', 'The bill has been removed.', 'success');
                        fetchBills();
                    } else {
                        throw new Error('Delete failed');
                    }
                } catch (err) {
                    console.error('Delete error:', err);
                    Swal.fire('Error', 'Failed to delete bill', 'error');
                }
            }
        });
    };

    const handleAddPublicBill = async () => {
        if (!publicBillForm.title || !publicBillForm.category || !publicBillForm.amount || !publicBillForm.date) {
            Swal.fire('Error', 'Please fill in all required fields', 'warning');
            return;
        }

        try {
            const token = await user.getIdToken();
            const res = await fetch('https://bill-wise-server.vercel.app/admin/add-public-bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(publicBillForm)
            });

            if (res.ok) {
                Swal.fire('Success', 'Public bill added successfully!', 'success');
                setAddModalOpen(false);
                setPublicBillForm({
                    title: '',
                    category: '',
                    email: '',
                    location: '',
                    description: '',
                    image: '',
                    date: '',
                    amount: ''
                });
            } else {
                throw new Error('Add failed');
            }
        } catch (err) {
            console.error('Add error:', err);
            Swal.fire('Error', 'Failed to add public bill', 'error');
        }
    };

    // Pagination
    const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBills = filteredBills.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">Manage All Bills</h1>
                    <p className="text-gray-600">View and manage all bill payments from all users</p>
                </div>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Public Bill
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search bills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="amount">Sort by Amount</option>
                        <option value="username">Sort by Username</option>
                    </select>

                    {/* Sort Order */}
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50"
                    >
                        <ArrowUpDown size={20} />
                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>

            {/* Bills Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-blue-300 rounded-lg overflow-hidden">
                        <thead className="bg-blue-200 text-gray-700">
                            <tr className="text-center">
                                <th 
                                    className="border border-blue-300 px-4 py-3 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort('username')}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        Username
                                        {sortBy === 'username' && (
                                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="border border-blue-300 px-4 py-3">Email</th>
                                <th 
                                    className="border border-blue-300 px-4 py-3 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        Amount
                                        {sortBy === 'amount' && (
                                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="border border-blue-300 px-4 py-3">Address</th>
                                <th className="border border-blue-300 px-4 py-3">Phone</th>
                                <th 
                                    className="border border-blue-300 px-4 py-3 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort('date')}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        Payment Date
                                        {sortBy === 'date' && (
                                            <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="border border-blue-300 px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBills.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        No bills found
                                    </td>
                                </tr>
                            ) : (
                                currentBills.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-blue-50 text-center">
                                        <td className="border border-blue-300 px-4 py-3 font-medium">{bill.username}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.email}</td>
                                        <td className="border border-blue-300 px-4 py-3 font-semibold text-green-600">৳{bill.amount}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.address || 'N/A'}</td>
                                        <td className="border border-blue-300 px-4 py-3">{bill.phone || 'N/A'}</td>
                                        <td className="border border-blue-300 px-4 py-3">
                                            {bill.createdAt
                                                ? new Date(bill.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                        <td className="border border-blue-300 px-4 py-3">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => openUpdateModal(bill)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(bill)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-gray-600">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredBills.length)} of {filteredBills.length} bills
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-blue-300 hover:bg-blue-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-blue-50 rounded-2xl shadow-xl p-6 w-11/12 max-w-xl relative border border-blue-200">
                        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">Update Bill</h2>
                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 font-bold text-2xl"
                        >
                            &times;
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="font-semibold text-blue-700">Amount</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value === "" ? "" : Number(e.target.value) })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                                    setForm({ ...form, phone: value });
                                }}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Payment Date</label>
                            <input
                                type="date"
                                value={form.createdAt}
                                onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
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

            {/* Add Public Bill Modal */}
            {addModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-blue-50 rounded-2xl shadow-xl p-6 w-11/12 max-w-2xl relative border border-blue-200 my-8">
                        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">Add Public Bill</h2>
                        <button
                            onClick={() => setAddModalOpen(false)}
                            className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 font-bold text-2xl"
                        >
                            &times;
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="font-semibold text-blue-700">Title *</label>
                            <input
                                type="text"
                                placeholder="Title"
                                value={publicBillForm.title}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, title: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Category *</label>
                            <input
                                type="text"
                                placeholder="Category"
                                value={publicBillForm.category}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, category: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={publicBillForm.email}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, email: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                value={publicBillForm.location}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, location: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700 col-span-full">Description</label>
                            <textarea
                                placeholder="Description"
                                value={publicBillForm.description}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, description: e.target.value })}
                                className="col-span-full px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="3"
                            />
                            <label className="font-semibold text-blue-700">Image URL</label>
                            <input
                                type="url"
                                placeholder="Image URL"
                                value={publicBillForm.image}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, image: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Date *</label>
                            <input
                                type="date"
                                value={publicBillForm.date}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, date: e.target.value })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <label className="font-semibold text-blue-700">Amount *</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={publicBillForm.amount}
                                onChange={(e) => setPublicBillForm({ ...publicBillForm, amount: e.target.value === "" ? "" : Number(e.target.value) })}
                                className="px-4 py-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                onClick={handleAddPublicBill}
                                className="col-span-full w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Add Public Bill
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAllBills;
