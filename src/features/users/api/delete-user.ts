import { useMutation,useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"

import {getUsersQueryOptions}from "./get-users"


export type DeleteUserDTO={
    userId:string;
}

export const deleteUser =  ({userId}:DeleteUserDTO)=> {
return api.delete(`/users/${userId}`);
}

type UseDeleteUserOptions = {
    mutationOptions?:MutationConfig<typeof deleteUser>;
}

export const useDeleteUser = ({mutationOptions}:UseDeleteUserOptions = {}) => {
    const queryClient = useQueryClient();
    const {onSuccess,...restConfig} =mutationOptions||{};
    return useMutation({
        onSuccess:(...args)=>{
            queryClient.invalidateQueries({
                queryKey:getUsersQueryOptions().queryKey
            });
            onSuccess?.(...args); //这里是调用传入的配置项中的onSuccess函数
        },
        ...mutationOptions, //这里是传入的配置项
        mutationFn:deleteUser //这里是调用的api请求函数
    })
}