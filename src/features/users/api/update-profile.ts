import {useMutation}from "@tanstack/react-query";
import { z } from "zod";


import { api } from "@/lib/api-client";
import { useUser } from "@/lib/auth";
import { MutationConfig } from "@/lib/react-query";

export const updateProfileInputSchema =  z.object({
    email:z.string().min(1,'Require').email('Invalid email'),
    firstName:z.string().min(1,'Require'),
    lastName:z.string().min(1,'Require'),
    bio:z.string()
});//这里是一个zod的schema，用于校验输入的数据

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;//这里是根据schema生成的类型

export const updateProfile =  ({data}:{data:UpdateProfileInput})=> {
    return api.patch('/profile',data);
}//这里是一个api请求函数，用于更新用户信息

type UseUpdateProfileOptions = {
    mutationConfig?:MutationConfig<typeof updateProfile>;
}

export const useUpdateProfile =({
    mutationConfig,
}:UseUpdateProfileOptions = {}) => {
    const {refetch:refetchUser}= useUser(); //这里是获取用户信息的hook

    const {onSuccess,...restConfig} =mutationConfig||{};

    return useMutation({
        onSuccess:(...args)=>{
            refetchUser();
            onSuccess?.(...args);
        },
        ...mutationConfig,
        mutationFn:updateProfile
    })
}