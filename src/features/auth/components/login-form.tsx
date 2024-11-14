import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from "@/lib/auth"

type LoginFormProps = {
    onSuccess?: () => void;
}; //这个是一个类型声明，用来声明这个组件的props的类型

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const login = useLogin({ onSuccess }); //这个是一个自定义hook，用来处理登录逻辑

    const [searchParams] = useSearchParams(); //这个是一个自定义hook，用来获取url参数
    const redirectTo = searchParams.get('redirectTo'); //这个是一个变量，用来获取redirectTo参数，如果没有就跳转到首页

    return (
        <>
            <Form
                onSubmit={(values) => {
                    login.mutate(values); //这个是一个函数，用来提交表单
                }}
                schema={loginInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Input
                            type='email'
                            label='Email Address'
                            error={formState.errors['email']}
                            registration={register('email')}
                        />
                        <Input
                            type='password'
                            label='Password'
                            error={formState.errors['password']}
                            registration={register('password')}
                        ></Input>
                        <div>
                            <Button
                                isLoading={login.isPending}
                                type='submit'
                                className='w-full'
                            >
                                登陆
                            </Button>
                        </div>
                    </>
                )}
            </Form>
            {/*  */}
            <div className='mt-2 flex items-center justify-end'>
                <div className='text-sm'>
                    <Link 
                    to={paths.auth.register.getHref(redirectTo)}
                    className='font-medium text-blue-600 hover:text-blue-500'
                    >
                        <span>没有账号？</span>
                        <span className='text-blue-600 hover:text-blue-500'>注册</span>
                    </Link>
                </div>
            </div>
        </>
    )
} //这个是一个函数组件，用来渲染登录表单
