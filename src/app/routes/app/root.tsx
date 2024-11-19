import { Outlet } from "react-router-dom"; // 路由出口

import { DashboardLayout } from "@/components/layouts";

export const AppRoot = () => {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}

export const AppRootErrorBoundary = () => {
    return <div> something went wrong! </div>
};