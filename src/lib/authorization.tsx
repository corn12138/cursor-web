import React, { useCallback } from "react";

import { Comment, User } from "@/types/api";
import { useUser } from "./auth";

export enum ROLES {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
    'comment:delete': (user: User, comment: Comment) => {
        if (user.role === ROLES.ADMIN) return true;
        if (user.role === ROLES.USER && comment.author?.id === user.id) return true;

        return false;
    },
};

export const useAuthorization = () => {
    const user = useUser();

    if (!user.data) {
        throw new Error('User is not authenticated');
    }

    const checkAccess = useCallback(({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
        if (allowedRoles && allowedRoles.length > 0 && user.data) {
            return allowedRoles.includes(user.data.role as RoleTypes); //as RoleTypes 是将user.data.role转换为RoleTypes类型
        }
        return true;
    },
        [user.data],
    );

    return {
        checkAccess,
        role: user.data.role
    }
}//  用于检查用户是否有权限执行某些操作

type AuthorizationProps = {
    forbiddenFallback?: React.ReactNode; // 未授权时的回退组件
    children: React.ReactNode; // 子组件
} & (
        | {
            allowedRoles: RoleTypes[]; // 允许的角色
            policyCheck?: never; // 策略--never表示不需要

        } | {
            allowedRoles?: never; // 允许的角色--never表示不需要
            policyCheck: boolean; // 策略检查
        }
    );

export const Authorization = ({
    forbiddenFallback = null,
    children,
    allowedRoles,
    policyCheck
}: AuthorizationProps) => {
    const { checkAccess } = useAuthorization();

    let canAccess = false;
    if (allowedRoles) {
        canAccess = checkAccess({ allowedRoles });  //检查用户是否有权限
    }
    if (typeof policyCheck !== 'undefined') {
        canAccess = policyCheck; //检查策略
    }

    return <>{canAccess ? children : forbiddenFallback}</>

}