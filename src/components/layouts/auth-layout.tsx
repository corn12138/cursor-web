import React ,{useEffect} from "react";
import { useNavigate,useSearchParams } from "react-router-dom";

import logo from "@/assets/logo.svg";
import {Head} from "@/components/seo"
import {Link} from "@/components/ui/link";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";


type LayoutProps = {
    children: React.ReactNode;
    title:string;
};

export const AuthLayout = ({children,title}:LayoutProps)=>{
    const user = useUser();
    const [searchParams] = useSearchParams(); //获取当前URL的查询参数
    const redirectTo = searchParams.get('redirectTo');//获取查询参数中的redirectTo

    const navigate = useNavigate(); //获取导航函数

    useEffect(()=>{
        if(user.data){
           navigate(redirectTo?redirectTo:paths.app.dashboard.getHref(),{
                replace:true //替换当前页面
           });//如果用户已登录，则跳转到redirectTo或者首页
        }
    },[user.data,redirectTo,navigate])//当user,redirectTo,navigate发生变化时执行

    return (
        <>
            <Head title={title}></Head> 
            <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                    <Link
                    className="flex items-center text-white"
                    to={paths.home.getHref()}
                    >
                        <img className="h-24 w-auto" src={logo} alt="Workflow" />
                    </Link>
                    </div>
                    <h2 className="mt-3 text-center text-3xl font-extralight text-gray-900">
                        {title}
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-8">
                    {children}
                    </div>

                </div>
            </div>
        </>
    );
};  //这是一个AuthLayout组件，它接受一个children和title属性，它是一个React组件，它返回一个div元素

