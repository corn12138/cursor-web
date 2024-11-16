import { useQuery ,queryOptions} from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig, queryConfig } from "@/lib/react-query";
import { Discussion } from "@/types/api";

export const getDiscussion = ({discussionId}:{discussionId:string}):Promise<{data:Discussion}> => {
    return api.get(`/discussions/${discussionId}`);
} //这是一个异步函数，返回一个promise

export const getDiscussionQueryOptions =(discussionId:string)=>{
    return queryOptions({
        queryKey:['discussion',discussionId],
        queryFn:()=>getDiscussion({discussionId}),
    });
}//这是一个函数，返回一个对象
 
type UseGetDiscussionOptions = {
    discussionId:string;
    queryConfig?:QueryConfig<typeof getDiscussionQueryOptions>;
}

export const useDiscussion = ({discussionId,queryConfig}:UseGetDiscussionOptions)=>{
    return useQuery({
        ...getDiscussionQueryOptions(discussionId),
        ...queryConfig}); //这个写法是把两个对象合并成一个对象
}