import {UseMutationOptions,DefaultOptions} from "@tanstack/react-query";

export const queryConfig = {
    queries: {
        refetchOnWindowFocus: false, //这是一个全局配置，可以在每个查询中覆盖
        retry:false, //这作用是在请求失败时不重试
        staleTime: 1000*60, //其作用是在数据变得陈旧之前，将数据视为新鲜的时间
    } 
} satisfies DefaultOptions; // satisfies 的作用是将 queryConfig 的类型赋值给 DefaultOptions

export type ApiFnReturnType<FnType extends (...args:any)=>Promise<any>> = Awaited<ReturnType<FnType
>>;

export type QueryConfig<T extends (...args:any[])=>any>=Omit<ReturnType<T>,'queryKey'|'queryFn'> // QueryConfig 的类型是 queryConfig 的类型去掉 queryKey 和 queryFn
export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;//  MutationConfig 的类型是 UseMutationOptions 的类型，第一个参数是 MutationFnType 的返回值，第二个参数是 Error，第三个参数是 MutationFnType 的第一个参数