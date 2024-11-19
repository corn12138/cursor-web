import React from "react";

import { Head } from "../seo";

type ContentLayoutProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export const ContentLayout = ({children,title}:ContentLayoutProps)=>{
    return (
        <>
            <Head title={title}></Head>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {title}
                    </h1>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};//这是一个ContentLayout组件，它接受一个children和title属性，它是一个React组件，它返回一个div元素