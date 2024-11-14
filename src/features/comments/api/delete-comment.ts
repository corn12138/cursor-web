import {useMutation,useQueryClient} from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getInfiniteCommentsQueryOptions } from './get-comments';

export const deleteComment = ({commentId}:{commentId: string}) => {
    return api.delete(`/comments/${commentId}`); //这是操作 对应的api 产生的效果是删除评论
}

type UseDeleteCommentOptions = {
    discussionId: string;
    mutationConfig?: MutationConfig<typeof deleteComment>;
}

export const useDeleteComment = ({discussionId,mutationConfig}:UseDeleteCommentOptions) => {
    const queryClient = useQueryClient();
    const {onSuccess,...restConfig} = mutationConfig || {}; // 这里是解构赋值
    return useMutation({
        onSuccess:(...args)=>{
            queryClient.invalidateQueries({
                queryKey:getInfiniteCommentsQueryOptions(discussionId).queryKey,
            });
            onSuccess && onSuccess(...args);
        },
        ...restConfig,
        mutationFn:deleteComment,
    })
}