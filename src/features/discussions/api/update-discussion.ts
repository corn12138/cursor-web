import {useMutation,useQueryClient} from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import {MutationConfig} from "@/lib/react-query";
import {Discussion} from "@/types/api";

import {getDiscussionsQueryOptions} from "./get-discussions";

export const updateDiscussionInputSchema = z.object({
    title:z.string().min(1,'标题不能为空'),
    body:z.string().min(1,'内容不能为空'),
}) //这是一个用于验证的对象

export type UpdateDiscussionInput=z.infer<typeof updateDiscussionInputSchema>;

export const updateDiscussion = ({discussionId,data}:{discussionId:string,data:UpdateDiscussionInput}):Promise<Discussion>=>{
    return api.patch(`/discussions/${discussionId}`,data);
}

type UseUpdateDiscussionOptions = {
    mutationConfig?:MutationConfig<typeof updateDiscussion>;
}

export const useUpdateDiscussion = ({mutationConfig}:UseUpdateDiscussionOptions={})=>{
    const queryClient = useQueryClient();
    const {onSuccess,...restConfig}=mutationConfig||{};
    return useMutation({
        onSuccess:(...args)=>{
            queryClient.invalidateQueries({queryKey:getDiscussionsQueryOptions().queryKey});
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn:updateDiscussion,
    });
} // 这个函数是用于更新讨论的，返回一个对象，包含了一个函数和一个对象