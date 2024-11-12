import * as DrawerPrimitive from '@radix-ui/react-dialog'; // 这是一个React组件库，提供了一些基础的UI组件
import { Cross2Icon } from '@radix-ui/react-icons'; // 这是一个React组件库，提供了一些基础的UI组件    
import { cva, type VariantProps } from 'class-variance-authority'; // 这是个工具库，用于处理CSS类名
import React from 'react'; // 这是React的核心库

import { cn } from '@/utils/cn'; // 这是一个工具函数，用于处理CSS类名

const Drawer = DrawerPrimitive.Root; // DrawerPrimitive.Root是Drawer的根组件
const DrawerTrigger = DrawerPrimitive.Trigger; // DrawerPrimitive.Trigger是用来触发Drawer的组件
const DrawerClose = DrawerPrimitive.Close; // DrawerPrimitive.Close是用来关闭Drawer的组件
const DrawerPortal = DrawerPrimitive.Portal; // DrawerPrimitive.Portal 是用来渲染Drawer的组件

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className)} {...props} ref={ref} />
)); //这是封装的一个DrawerOverlay组件，用于渲染Drawer的遮罩层

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName; // 设置DrawerOverlay的显示名称 

const drawerVarints = cva(
    'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out', {
    variants: {
        side: {
            top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
            bottom:
                'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
            right:
                'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
        },
    },
    defaultVariants: {
        side: 'right'
    }
}
)// 这是一个CSS类名的变体，用于设置Drawer的样式

type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & VariantProps<typeof drawerVarints>; // 这是DrawerContent的属性类型

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, DrawerContentProps>(({ side = 'right', className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content 
        className={cn(drawerVarints({ side }), className)} 
        {...props} 
        ref={ref}>
           
            {children}
            <DrawerPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
                <Cross2Icon className='size-4' />
                <span className='sr-only'>关闭</span>
            </DrawerPrimitive.Close>
        </DrawerPrimitive.Content>
    </DrawerPortal>
)); // 这是一个DrawerContent组件，用于渲染Drawer的内容
DrawerContent.displayName = DrawerPrimitive.Content.displayName; // 设置DrawerContent的显示名称

const DrawerHeader = ({
    className,
    ...props
}:React.HTMLAttributes<HTMLDivElement>) => (  
    <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
    ></div>
) // 这是一个DrawerHeader组件，用于渲染Drawer的头部
DrawerHeader.displayName = 'DrawerHeader'; // 设置DrawerHeader的显示名称

const DrawerFooter = ({className, ...props}:React.HTMLAttributes<HTMLDivElement>) => (
    <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
    ></div>
); // 这是一个DrawerFooter组件，用于渲染Drawer的底部
DrawerFooter.displayName = 'DrawerFooter'; // 设置DrawerFooter的显示名称

const DrawerTile = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>,React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>>(({className, ...props}, ref) => (
    <DrawerPrimitive.Title
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
    ref={ref}
    ></DrawerPrimitive.Title> 
))// 这是一个DrawerTile组件，用于渲染Drawer的标题
DrawerTile.displayName = DrawerPrimitive.Title.displayName; // 设置DrawerTile的显示名称

const DrawerDescription = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Description>,React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>>(({className, ...props}, ref) => (
    <DrawerPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
    ref={ref}
    ></DrawerPrimitive.Description>
)) // 这是一个DrawerDescription组件，用于渲染Drawer的描述
DrawerDescription.displayName = DrawerPrimitive.Description.displayName; // 设置DrawerDescription的显示名称

export {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTile,
    DrawerDescription,
    DrawerClose,
    DrawerPortal,
    DrawerOverlay
}