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
import ContactUsPage from "../Pages/ContactUsPage";
import PrivicyPolicyPage from "../Pages/PrivicyPolicyPage";

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
                    
                        <BillDetailsPage />
                    
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
        path: "/*",
        element: <Error404Page />,
    },
]);

export default router;
