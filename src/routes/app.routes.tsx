import { HomePage } from "@/pages/HomePage/HomePage";
import { MainLayout } from "@/pages/MainLayout/MainLayout";
import { createBrowserRouter, Navigate } from 'react-router';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { 
                element: <HomePage />,
                index: true
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
]);