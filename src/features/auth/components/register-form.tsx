import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form, Input, Select, Label, Switch } from "@/components/ui/form";
import { paths } from "@/config/paths";
import { useRegister, registerInputSchema } from "@/lib/auth";
import { Team } from "@/types/api"; // 这个是一个类型声明，用来声明这个组件的props的类型

type RegisterFormProps = {
    onSuccess?: () => void;
    chooseTeam?: boolean;
    setchooseTeam?: () => void;
    teams: Team[];
};

export const RegisterForm = ({
    onSuccess,
    chooseTeam,
    setchooseTeam,
    teams }: RegisterFormProps) => {
    const registering = useRegister({ onSuccess }); //这个是一个自定义hook，用来处理注册逻辑
    const [searchParams] = useSearchParams(); //这个是一个自定义hook，用来获取url参数
    const redirectTo = searchParams.get("redirectTo"); //这个是一个变量，用来获取redirectTo参数，如果没有就跳转到首页

    return (
        <>
            <div>
                <Form
                    onSubmit={(values) => {
                        registering.mutate(values); //这个是一个函数，用来提交表单
                    }}
                    schema={registerInputSchema} //这个是一个对象，用来验证表单
                    options={{ shouldUnregister: true }} //这个是一个对象，用来配置表单
                >
                    {({ register, formState }) => (
                        <>
                            <Input
                                type="text"
                                label="First Name"
                                error={formState.errors["firstName"]}
                                registration={register("firstName")}
                            />
                            <Input
                                type="text"
                                label="Last Name"
                                error={formState.errors["lastName"]}
                                registration={register("lastName")}
                            />
                            <Input
                                type="email"
                                label="Email Address"
                                error={formState.errors["email"]}
                                registration={register("email")}
                            />
                            <Input
                                type="password"
                                label="Password"
                                error={formState.errors["password"]}
                                registration={register("password")}
                            />
                            {/*  */}
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={chooseTeam}
                                    onCheckedChange={setchooseTeam}
                                    className={`${chooseTeam ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
                                    id="choose-team"
                                />

                                <Label htmlFor="airplane-mode">加入已存在的团队</Label>
                            </div>
                            {
                                chooseTeam && teams ? (
                                    <Select
                                        label="Team"
                                        error={formState.errors["teamId"]}
                                        registration={register("teamId")}
                                        options={teams?.map((team) => ({
                                            label: team.name,
                                            value: team.id,
                                        }))}
                                    />


                                ) : (
                                    <Input
                                        type="text"
                                        label="Team Name"
                                        error={formState.errors["teamName"]}
                                        registration={register("teamName")}
                                    />
                                )}
                            <div>
                                <Button
                                    isLoading={registering.isPending}
                                    type="submit"
                                    className="w-full"
                                >
                                    注册
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
                <div className="mt-2 flex items-center justify-end">
                    <div className="text-sm">
                        <Link
                            to={paths.auth.login.getHref(redirectTo)}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            <span>已有账号？</span>
                            <span className="text-blue-600 hover:text-blue-500">登录</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};