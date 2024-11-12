import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 这是一个React Query的Provider
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // 这是一个React Query的Devtools   
import React from "react";

import { ErrorBoundary } from "react-error-boundary"; //此插件的作用是捕获React组件的错误并显示一个备用UI
import { HelmetProvider } from "react-helmet-async"; //此插件的作用是管理React组件的头部信息


import {MainErrorFallback } from "@/components/errors/main"; // 这是一个React组件，用于显示一个错误信息

import { Spinner } from "@/components/ui/spinner";
type AppProviderProps = {
    children: React.ReactNode; // React.ReactNode是一个类型，表示可以是任何React节点，包括React元素、字符串、数字、数组、Fragment等
};

export const AppProviderProps = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(() => new QueryClient()); // 创建一个QueryClient实例

    return (
        <>
            {/* suspense 是 */}
            <React.Suspense fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }>
                
            </React.Suspense>
        </>
    )
}