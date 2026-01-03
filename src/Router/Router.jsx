import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUp from "../Pages/RegisterPage";
import Error404Page from "../Pages/Error404Page";
import BillsPage from "../Pages/BillsPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../PrivateRoute/AdminRoute";
import BillDetailsPage from "../Pages/BillDetailsPage";
import MyPayBillsPage from "../Pages/MyPayBillsPage";
import AboutPage from "../Pages/AboutPage";
import MyProfilePage from "../Pages/MyProfilePage";
import ContactUsPage from "../Pages/ContactUsPage";
import PrivicyPolicyPage from "../Pages/PrivicyPolicyPage";
import AdminDashboardHome from "../Pages/Dashboard/AdminDashboardHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageAllBills from "../Pages/Dashboard/ManageAllBills";
import AddPublicBill from "../Pages/Dashboard/AddPublicBill";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: async () => {
                    const res = await fetch("https://bill-wise-server.vercel.app/public-bills");
                    return res.json();
                },
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <SignUp />,
            },
            {
                path: "/bills",
                element: <BillsPage />,
                loader: async () => {
                    const res = await fetch("https://bill-wise-server.vercel.app/all-public-bills");
                    return res.json();
                },
            },
            {
                path: "/bills/:id",
                element: (
                    
                        <BillDetailsPage />
                    
                ),
                loader: async ({ params }) => {
                    const res = await fetch(`https://bill-wise-server.vercel.app/public-bill/${params.id}`);
                    return res.json();
                },
            },
            {
                path: "/my-pay-bills",
                element: (
                    <PrivateRoute>
                        <MyPayBillsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/my-profile",
                element: (
                    <PrivateRoute>
                        <MyProfilePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/contact-us",
                element: <ContactUsPage></ContactUsPage>
            },
            {
                path: "/privacy-policy",
                element: <PrivicyPolicyPage></PrivicyPolicyPage>
            }
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "home",
                element: <DashboardHome />,
            },
            {
                path: "manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-all-bills",
                element: (
                    <AdminRoute>
                        <ManageAllBills />
                    </AdminRoute>
                ),
            },
            {
                path: "add-public-bill",
                element: (
                    <AdminRoute>
                        <AddPublicBill />
                    </AdminRoute>
                ),
            },
            {
                path: "my-bills",
                element: <MyPayBillsPage />,
            },
            {
                path: "my-profile",
                element: <MyProfilePage />,
            },
        ],
    },
    {
        path: "/*",
        element: <Error404Page />,
    },
]);

export default router;
