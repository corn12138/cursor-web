import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'
import { Team } from '@/types/api'

export const getTeams = (): Promise<{ data: Team[] }> => {
    return api.get('/teams')
}

export const getTeamsQueryOptions = () => {
    return queryOptions({
        queryKey: ['teams'],
        queryFn: () => getTeams(),
    })
} //这个文件导出了一个用于获取团队列表的函数和一个用于获取团队列表的查询选项函数。这些函数将在我们的团队列表页面中使用。--

type UseTeamsOptions = {
    queryConfig?: QueryConfig<typeof getTeamsQueryOptions>
}

export const useTeams = ({ queryConfig = {} }: UseTeamsOptions = {}) => {
    return useQuery({
        ...getTeamsQueryOptions(),
        ...queryConfig
    })
}// 这是一个自定义钩子，用于获取团队列表。它接受一个queryConfig参数，该参数可以用于传递查询配置。我们将在团队列表页面中使用此钩子。--