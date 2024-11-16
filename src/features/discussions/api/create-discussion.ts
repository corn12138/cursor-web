import { z } from "zod";
import {useMutation,useQueryClient}from "@tanstack/react-query";


import { api } from "@/lib/api-client";
import {MutationConfig}from "@/lib/react-query";
import {Discussion}from "@/types/api";

import {getDiscussionsQueryOptions}from "./get-discussions";

export const createDiscussionInputSchema = z.object({
    title:z.string().min(1,'标题不能为空'),
    body:z.string().min(1,'内容不能为空'),
}) //这是一个用于验证的对象

export type CreateDiscussionInput=z.infer<typeof createDiscussionInputSchema>;

export const createDiscussion = ({data}:{data:CreateDiscussionInput}):Promise<Discussion>=>{
    return api.post('/discussions',data);
};//这是一个异步函数，返回一个promise

type UseCreateDiscussionOptions = {
    mutationConfig?:MutationConfig<typeof createDiscussion>;
}

export const useCreateDiscussion = ({mutationConfig}:UseCreateDiscussionOptions={})=>{
    const queryClient = useQueryClient();
    const {onSuccess,...restConfig}=mutationConfig||{};
    //这里的mutationConfig是一个对象，如果mutationConfig存在，就解构出onSuccess和restConfig，否则就是一个空对象
    return useMutation({
        onSuccess:(...args)=>{
            queryClient.invalidateQueries({queryKey:getDiscussionsQueryOptions().queryKey});
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn:createDiscussion,
    });
}