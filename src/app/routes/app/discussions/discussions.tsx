import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { getDiscussionsQueryOptions } from "@/features/discussions/api/get-discussions";
import { CreateDiscussion } from "@/features/discussions/components/create-discussion"
import { DiscussionsList } from "@/features/discussions/components/discussions-list";

export const discussionsLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url); // 获取url

    const page = Number(url.searchParams.get('page') || 1); // 获取page参数

    const query = getDiscussionsQueryOptions({ page }); // 获取query

    return (
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    );

};

export const DiscussionsRoute = () => {
    const queryClient = useQueryClient();

    return (
        <ContentLayout title='Discussions'>
            <div className='flex justify-end'>
              <CreateDiscussion />  
            </div>
            <div className='mt-4'>
              <DiscussionsList
             onDiscussionPrefetch={(id)=>{
                // 预取数据-Prefetch the comments data when the user hovers over the link in the list - 鼠标悬停在列表中的链接上时预取评论数据
                queryClient.prefetchInfiniteQuery(getInfiniteCommentsQueryOptions(id))
             }}
              />  
            </div>
            
        </ContentLayout>
    )
}