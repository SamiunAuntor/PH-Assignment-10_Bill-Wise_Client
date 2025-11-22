import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUp from "../Pages/RegisterPage";
import Error404Page from "../Pages/Error404Page";
import BillsPage from "../Pages/BillsPage";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: () => fetch('http://localhost:5000/public-bills'),
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
                loader: () => fetch('http://localhost:5000/all-public-bills'),
            }

        ]
    },
    {
        path: "/*",
        Component: Error404Page,
    }

])




export default router;