// 用于定义所有路由的路径和获取路径的方法

export const paths = {
    home: {
        path: "/",
        getHref: () => "/"
    },

    auth: {
        register: {
            path: "/auth/register",
            getHref: (redirectTo?: string | null | undefined) => `/auth/register${redirectTo ? `redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
        },
        login: {
            path: "/auth/login",
            getHref: (redirectTo?: string | null | undefined) => `/auth/login${redirectTo ? `redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
        }
    },

    app: {
        root: {
            path: "/app",
            getHref: () => "/app"
        },
        dashboard: {
            path: '',
            getHref: () => "/app"
        },
        discussions: {
            path: 'discussions',
            getHref: () => "/app/discussions"
        },
        discussion: {
            path: 'discussions/:discussionId',
            getHref: (id: string) => `/app/discussions/${id}`
        },
        users: {
            path: 'users',
            getHref: () => "/app/users"
        },
        profile: {
            path: 'profile',
            getHref: () => "/app/profile"
        }
    }
} as const; //这里的目的是定义一个常量对象，这个对象包含了所有的路径，每个路径都有一个path属性和一个getHref方法，getHref方法用于获取路径