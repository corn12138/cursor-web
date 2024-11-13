// 这是一个公共的类型定义文件，用于定义一些公共的类型
export type BaseEntity = {
    id:string;
    createdAt:string; //这是一个时间戳
}

export type Enity<T> = {
    [K in keyof T]:T[K]  //这是一个映射类型

}&BaseEntity;

export type Meta = {
    page:number;
    total:number;
    totalPage:number;
}

export type User = Enity<{
    firstName:string;
    lastName:string;
    email:string;
    role:'admin'|'user'|'ADMIN'|'USER';
    teamId:string;
bio:string;
}>

export type AuthResponse = {
    jwt:string;
    user:User;
}

export type Team = Enity<{
    name:string;
    description:string;
}>

export type Discussion = Enity<{
    title:string;
    body:string;
    teamId:string; //这是一个外键
    author:User;
}>;

export type Comment = Enity<{
    body:string;
    discussionId:string; //这是一个外键
    author:User;
}>