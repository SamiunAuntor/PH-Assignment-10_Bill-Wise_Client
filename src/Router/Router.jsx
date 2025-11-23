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

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: async () => {
                    const res = await fetch("http://localhost:5000/public-bills");
                    return res.json();
                },
            },
            {
                path: "/login",
                Component: LoginPage,
            },
            {
                path: "/register",
                Component: SignUp,
            },
            {
                path: "/bills",
                Component: BillsPage,
                loader: async () => {
                    const res = await fetch("http://localhost:5000/all-public-bills");
                    return res.json();
                },
            },
            {
                path: "/bills/:id",
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:5000/public-bill/${params.id}`);
                    return res.json();
                },
                element: (
                    <PrivateRoute>
                        <BillDetailsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-pay-bills",
                element: (
                    <PrivateRoute>
                        <MyPayBillsPage />
                    </PrivateRoute>
                )
            }


        ],
    },
    {
        path: "/*",
        Component: Error404Page,
    },
]);

export default router;
