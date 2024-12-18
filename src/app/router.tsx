import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

import { AppRoot, AppRootErrorBoundary } from './routes/app/root';

// 这里的目的是定义一个路由器，这个路由器包含了所有的路由，每个路由都有一个path属性和一个lazy方法，lazy方法用于异步加载组件
export const createRouter = (queryClient: QueryClient

) => createBrowserRouter([
  {
    path: paths.home.path,
    lazy: async () => {
      const { LandingRoute } = await import('./routes/landing');
      return { Component: LandingRoute };
    },
  },
  {
    path: paths.auth.register.path,
    lazy: async () => {
      const { RegisterRoute } = await import('./routes/auth/register');
      return { Component: RegisterRoute };
    },
  },
  {
    path: paths.auth.login.path,
    lazy: async () => {
      const { LoginRoute } = await import('./routes/auth/login');
      return { Component: LoginRoute };
    },
  },
  {
    path: paths.app.root.path,
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        path: paths.app.discussions.path,
        lazy: async () => {
          const { DiscussionsRoute, discussionsLoader } = await import(
            './routes/app/discussions/discussions'
          );
          return {
            Component: DiscussionsRoute,
            loader: discussionsLoader(queryClient),
          };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.app.discussion.path,
        lazy: async () => {
          const { DiscussionRoute, discussionLoader } = await import(
            './routes/app/discussions/discussion'
          );
          return {
            Component: DiscussionRoute,
            loader: discussionLoader(queryClient),
          };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.app.users.path,
        lazy: async () => {
          const { UsersRoute, usersLoader } = await import(
            './routes/app/users'
          );
          return {
            Component: UsersRoute,
            loader: usersLoader(queryClient),
          };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.app.profile.path,
        lazy: async () => {
          const { ProfileRoute } = await import('./routes/app/profile');
          return {
            Component: ProfileRoute,
          };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.app.dashboard.path,
        lazy: async () => {
          const { DashboardRoute } = await import('./routes/app/dashboard');
          return {
            Component: DashboardRoute,
          };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundRoute } = await import('./routes/not-found');
      return {
        Component: NotFoundRoute,
      };
    },
    ErrorBoundary: AppRootErrorBoundary,
  },
]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createRouter(queryClient), [queryClient]);

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}
