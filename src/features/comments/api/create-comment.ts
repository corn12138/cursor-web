import {useMutation,useQueryClient} from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import {MutationConfig}from "@/lib/react-query";
import { Comment } from "@/types/api";

import {getInfiniteCommentsQueryOptions} from './get-comments'

export const createCommentInputSchema = z.object({
    discussionId: z.string().min(1,'Required'),
    body:z.string().min(1,'Required')
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

export const createComment = ({data}:{data:CreateCommentInput}):Promise<Comment> => {
    return api.post('/comments',data);
}

type UseCreateCommentOptions ={
    discussionId:string;
    mutationConfig?:MutationConfig<typeof createComment>
}

export const useCreateComment = ({discussionId,mutationConfig}:UseCreateCommentOptions) => {
    const queryClient = useQueryClient(); //这个是react-query的一个hook，用来获取queryClient实例
    const {onSuccess,...restConfig} = mutationConfig || {};
    return useMutation({
        onSuccess:(...args) => {
            queryClient.invalidateQueries({
                queryKey:getInfiniteCommentsQueryOptions(discussionId).queryKey
            });
             onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn:createComment
    })
} //这个hook用来创建一个新的评论，当评论创建成功后，会自动刷新评论列表