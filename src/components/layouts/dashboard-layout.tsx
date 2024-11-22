import { Home, PanelLeft, Folder, Users, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, NavLink, useNavigation } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { cn } from '@/utils/cn';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/droupdown'
import { Link } from '../ui/link';

type SideNavgationItem = {
    name: string;
    to: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element; //icon是一个函数，它接受一个props属性，它返回一个JSX元素
}

const Logo = () => {
    return (
        <Link to={paths.home.getHref()} className="flex items-center text-white">
            <img className="h-24 w-auto" src={logo} alt="Workflow" />
            <span className='text-sm font-semibold text-white'>
                react-App
            </span>
        </Link>
    );
};

const Progress = () => {
    const { state, location } = useNavigation();

    const [progress, setProgress] = useState(0); //进度条的进度

    useEffect(() => {
        setProgress(0);
    },[location?.pathname]);

    useEffect(() => {
        if (state === 'loading') {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress == 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    const newProgress = oldProgress + 10;
                    return newProgress > 100 ? 100 : newProgress;
                });
            }, 300);
            return () => { clearInterval(timer); }
        }
    }, [state]);

    if (state !== 'loading') return null;

    return (
        <>
            <div className='fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out'
                style={{ width: `${progress}%` }}
            >
            </div>
        </>
    )
};//这是一个Progress组件，它是一个React组件，它返回一个div元素

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const logout = useLogout();
    const { checkAccess } = useAuthorization();
    const navigate = useNavigate();

    //导航栏
    const navigation = [
        { name: 'Dashboard', to: paths.app.dashboard.getHref(), icon: Home },
        { name: 'Discussions', to: paths.app.discussions.getHref(), icon: Folder },
        checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
            name: 'Users',
            to: paths.app.users.getHref(),
            icon: Users,
        },
    ].filter(Boolean) as SideNavgationItem[]; //过滤掉空值

    return (
        <>
            <div className='flex min-h-screen w-full flex-col bg-muted/40'>
                <aside className='fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex'>
                    <nav className='flex flex-col items-center gap-4 px-3 py-4'>
                        <div className='flex h-16 shrink-0 items-center px-4'>
                            <Logo />
                        </div>
                        {
                            navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    end={item.name !== 'Dashboard'}
                                    className={({ isActive }) => cn('text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                                        isActive && 'bg-gray-900 text-white')}
                                >
                                    <item.icon className={cn('text-gray-400 group-hover:text-gray-300', 'mr-4 size-6 shrink-0')}
                                        aria-hidden='true'
                                    />
                                    {item.name}
                                </NavLink>
                            ))
                        }
                    </nav>
                </aside>
                <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-60'>
                    <header
                        className='sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6'
                    >
                        <Progress />
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button size='icon' variant='outline' className='sm:hidden'>
                                    <PanelLeft className='size-5' />
                                    <span className='sr-only'>Toggle Menu</span>
                                </Button>
                            </DrawerTrigger>
                            {/*  */}
                            <DrawerContent
                                side='left'
                                className='bg-black pt-10 text-white sm:max-w-60'
                            >
                                <nav className='grid gap-6 text-lg font-medium'>
                                    <div className='flex h-16 shrink-0 items-center px-4'>
                                        <Logo />
                                    </div>
                                    {
                                        navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.to}
                                                end
                                                className={({ isActive }) => cn('text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                                                    isActive && 'bg-gray-900 text-white')}
                                            >
                                                <item.icon
                                                    className={cn('text-gray-400 group-hover:text-gray-300',
                                                        'mr-4 size-6 shrink-0')}
                                                    aria-hidden='true'
                                                />
                                                {item.name}
                                            </NavLink>
                                        ))
                                    }
                                </nav>
                            </DrawerContent>
                        </Drawer>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='overflow-hidden rounded-full'
                                >
                                    <span className='sr-only'>
                                        打开用户菜单
                                    </span>
                                    <User2 className='size-6 rounded-full' />
                                </Button>
                            </DropdownMenuTrigger>
                            {/*  */}
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigate(paths.app.profile.getHref());
                                    }}
                                    className={cn('block px-4 py-2 text-sm text-gray-700')}
                                >
                                    你的资料
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                                    onClick={() => logout.mutate({})}
                                >
                                    退出登录
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className='grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
};// 这是一个DashboardLayout组件，它接受一个children属性，它是一个React组件，它返回一个div元素---其作用是渲染一个侧边导航栏和一个主要内容区域