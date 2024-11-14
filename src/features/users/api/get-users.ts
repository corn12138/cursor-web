import {queryOptions,useQuery} from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import { QueryConfig } from '@/lib/react-query'
import { User } from '@/types/api'

export const getUsers =  ():Promise<{data:User[]}> => {
return api.get('/users');
}

export const getUsersQueryOptions = ()=>{
    return queryOptions({
        queryKey:['users'],
        queryFn:getUsers
    })
}

type UseUsersProps = {
    queryOptions?:QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({queryOptions}:UseUsersProps = {}) => {
return useQuery({
    ...getUsersQueryOptions(),
    ...queryOptions
})
} //这是一个自定义的hook，用于获取用户列表数据