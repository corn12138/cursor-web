import {queryOptions,useQuery}from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Discussion,Meta} from '@/types/api';

export const getDiscussions = (page = 1):Promise<{data:Discussion[];meta:Meta}>=>{
    return api.get('/discussions',{params:{page}});
};//这是一个异步函数，返回一个promise

export const getDiscussionsQueryOptions = ({page}:{page?:number}={})=>{
    return queryOptions({
        queryKey:['discussions',{page}],
        queryFn:()=>getDiscussions(page),
    });
}; //这是一个函数，返回一个对象

type UseDiscussionsOptions = {
    page?:number;
    queryConfig?:QueryConfig<typeof getDiscussionsQueryOptions>;
}

export const useDiscussions = ({page,queryConfig}:UseDiscussionsOptions)=>{
    return useQuery({
        ...getDiscussionsQueryOptions({page}),
        ...queryConfig,
    });
}; //这个写法是把两个对象合并成一个对象

