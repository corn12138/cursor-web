import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Discussion } from '@/types/api';

export const getDiscussion = ({
  discussionId,
}: {
  discussionId: string;
}): Promise<{ data: Discussion }> => {
  return api.get(`/discussions/${discussionId}`);
}; // 获取讨论

export const getDiscussionQueryOptions = (discussionId: string) => {
  return queryOptions({
    queryKey: ['discussions', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
}; // 获取讨论查询选项

type UseDiscussionOptions = {
  discussionId: string;
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
}; // 使用讨论选项

export const useDiscussion = ({
  discussionId,
  queryConfig,
}: UseDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(discussionId),
    ...queryConfig,
  });
};// 使用讨论
