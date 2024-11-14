import { configureAuth } from 'react-query-auth' //这是一个react-query-auth库作用是用来管理用户登录状态的
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';  //这是一个zod库，用来验证数据的-比如验证用户输入的数据是否符合要求

import { paths } from '@/config/paths';
import { AuthResponse, User } from '@/types/api';

import { api } from "./api-client";


const getUser = async (): Promise<User> => {
    const response = await api.get('/auth/me');

    return response.data;
};//这个函数是用来获取用户信息的

const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};//这个函数是用来退出登录的

export const loginInputSchema = z.object({
    email: z.string().min(1, 'Required').email('Invalid email address'),
    password: z.string().min(5, 'Required'),
});//这个是用来验证用户输入的数据是否符合要求的

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
    return api.post('/auth/login', data);
};//这个函数是用来登录的

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    console.log({
      pathname: location.pathname,
      redirectTo: paths.auth.login.getHref(location.pathname),
    });
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};

