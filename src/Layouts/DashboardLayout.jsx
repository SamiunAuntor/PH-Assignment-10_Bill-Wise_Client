import React, { useState, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    Menu, 
    X, 
    LogOut,
    Home,
    User as UserIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LifeLine } from 'react-loading-indicators';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully!");
            navigate('/');
        } catch (err) {
            toast.error("Failed to log out. Try again.");
        }
    };

    // Fetch user role from API
    const [userRole, setUserRole] = React.useState('user');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserRole = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const res = await fetch('http://localhost:5000/user-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setUserRole(data?.role || 'user');
            } catch (err) {
                console.error('Error fetching user role:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserRole();
    }, [user]);

    const isAdmin = userRole === 'admin';

    const adminMenuItems = [
        { path: '/dashboard/home', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
        { path: '/dashboard/manage-all-bills', label: 'Manage All Bills', icon: FileText },
        { path: '/dashboard/add-public-bill', label: 'Add Public Bill', icon: FileText },
    ];

    const userMenuItems = [
        { path: '/dashboard/home', label: 'My Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/my-bills', label: 'My Bills', icon: FileText },
        { path: '/dashboard/my-profile', label: 'My Profile', icon: UserIcon },
    ];

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LifeLine color="#318dcc" size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b border-blue-100 sticky top-0 z-40">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-blue-600">BillWise Dashboard</h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-gray-600 hover:text-blue-600"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`
                        fixed lg:sticky lg:top-0 left-0 z-30
                        h-screen lg:h-screen
                        w-64 bg-white shadow-lg border-r border-blue-100
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo & User Info */}
                        <div className="p-6 border-b border-blue-100">
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">BillWise</h2>
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/2Fxq9YH/default.png"}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {isAdmin ? 'Admin' : 'User'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.path}>
                                            <NavLink
                                                to={item.path}
                                                onClick={() => setSidebarOpen(false)}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                        isActive
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                    }`
                                                }
                                            >
                                                <Icon size={20} />
                                                <span className="font-medium">{item.label}</span>
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-blue-100 space-y-2">
                            <NavLink
                                to="/"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <Home size={20} />
                                <span className="font-medium">Back to Home</span>
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="p-4 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

