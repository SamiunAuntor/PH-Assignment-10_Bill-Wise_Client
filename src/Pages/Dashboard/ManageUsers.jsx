import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { LifeLine } from 'react-loading-indicators';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, roleFilter, statusFilter, users]);

    const fetchUsers = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const res = await fetch('http://localhost:5000/admin/all-users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            Swal.fire('Error', 'Failed to fetch users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = [...users];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (u) =>
                    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Role filter
        if (roleFilter !== 'all') {
            filtered = filtered.filter((u) => u.role === roleFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((u) => u.status === statusFilter);
        }

        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            const token = await user.getIdToken();
            const res = await fetch(`http://localhost:5000/admin/update-user-status/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                Swal.fire('Success', 'User status updated successfully', 'success');
                fetchUsers();
            } else {
                throw new Error('Update failed');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            Swal.fire('Error', 'Failed to update user status', 'error');
        }
    };

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-2">Manage Users</h1>
                <p className="text-gray-600">View and manage all registered users</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center text-gray-600">
                        <span className="text-lg font-semibold">
                            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-blue-300 rounded-lg overflow-hidden">
                        <thead className="bg-blue-200 text-gray-700">
                            <tr className="text-center">
                                <th className="border border-blue-300 px-4 py-3">Avatar</th>
                                <th className="border border-blue-300 px-4 py-3">Name</th>
                                <th className="border border-blue-300 px-4 py-3">Email</th>
                                <th className="border border-blue-300 px-4 py-3">Role</th>
                                <th className="border border-blue-300 px-4 py-3">Member Since</th>
                                <th className="border border-blue-300 px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-blue-50 text-center">
                                        <td className="border border-blue-300 px-4 py-3">
                                            <img
                                                src={user.photo || "https://i.ibb.co/2Fxq9YH/default.png"}
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full object-cover mx-auto"
                                            />
                                        </td>
                                        <td className="border border-blue-300 px-4 py-3 font-medium">{user.name}</td>
                                        <td className="border border-blue-300 px-4 py-3">{user.email}</td>
                                        <td className="border border-blue-300 px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-700' 
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="border border-blue-300 px-4 py-3">{formatDate(user.createdAt)}</td>
                                        <td className="border border-blue-300 px-4 py-3">
                                            <div className="relative inline-block">
                                                <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                                <select
                                                    value={user.status || 'active'}
                                                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                                    className={`pl-8 pr-3 py-1 rounded-lg text-sm font-semibold border focus:outline-none focus:ring-2 appearance-none ${
                                                        user.status === 'active'
                                                            ? 'bg-green-100 text-green-700 border-green-300'
                                                            : 'bg-red-100 text-red-700 border-red-300'
                                                    }`}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="blocked">Blocked</option>
                                                </select>
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
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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
        </div>
    );
};

export default ManageUsers;

