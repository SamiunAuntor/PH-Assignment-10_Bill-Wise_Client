import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },

        ]
    },
    {
        path: "/*",
        element: <div>404 Not Found</div>,
    }

])




export default router;