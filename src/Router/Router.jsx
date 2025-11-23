import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUp from "../Pages/RegisterPage";
import Error404Page from "../Pages/Error404Page";
import BillsPage from "../Pages/BillsPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import BillDetailsPage from "../Pages/BillDetailsPage";
import MyPayBillsPage from "../Pages/MyPayBillsPage";
import AboutPage from "../Pages/AboutPage";
import MyProfilePage from "../Pages/MyProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: async () => {
                    const res = await fetch("http://localhost:5000/public-bills");
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
                    const res = await fetch("http://localhost:5000/all-public-bills");
                    return res.json();
                },
            },
            {
                path: "/bills/:id",
                element: (
                    <PrivateRoute>
                        <BillDetailsPage />
                    </PrivateRoute>
                ),
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:5000/public-bill/${params.id}`);
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
        ],
    },
    {
        path: "/*",
        element: <Error404Page />,
    },
]);

export default router;
