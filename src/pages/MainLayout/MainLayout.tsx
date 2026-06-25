import { Outlet } from "react-router-dom"
import '@/styles/globals.css';

export const MainLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
    
}