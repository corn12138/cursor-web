// dialog的组件封装

import * as DialogPrimitive from '@radix-ui/react-dialog'; //这是一个dialog的库
import { Cross2Icon } from '@radix-ui/react-icons'; //这是一个icon的库
import React from 'react'; //这是React的核心库

import { cn } from '@/utils/cn';

const Dialog = DialogPrimitive.Dialog;  //这是关于dialog的组件

const DialogTrigger = DialogPrimitive.Trigger; //这是关于dialog的触发器组件

const DialogPortal = DialogPrimitive.Portal; //这是关于dialog的portal组件

const DialogClose = DialogPrimitive.Close; //这是关于dialog的关闭组件

const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay {...props} ref={ref} className={cn('fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className)} />
)); //此处是关于dialog的overlay组件--目的是为了实现dialog的遮罩层
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName; //此处是关于dialog的overlay组件的展示名称

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content 
        {...props} 
        ref={ref} 
        className={cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg', className)}
        >
            {children}
            <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                <Cross2Icon className='size-4' />
                <span className='sr-only'>关闭</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
)); //此处是关于dialog的content组件--目的是为了实现dialog的内容展示
DialogContent.displayName = DialogPrimitive.Content.displayName; //此处是关于dialog的content组件的展示名称

const DialogHeader  = ({className, ...props}:React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left',className)} {...props}></div>
); //此处是关于dialog的header组件--目的是为了实现dialog的头部展示

DialogHeader.displayName = 'DialogHeader'; //此处是关于dialog的header组件的展示名称

const DialogFooter = ({className, ...props}:React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',className)} {...props}></div>
); //此处是关于dialog的footer组件--目的是为了实现dialog的底部展示

DialogFooter.displayName = 'DialogFooter'; //此处是关于dialog的footer组件的展示名称

const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>,React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({className,...props},ref) => (    
    <DialogPrimitive.Title 
    ref={ref} 
    className={cn('text-lg font-semibold leading-none tracking-tight',className)} 
    {...props}
    />
)); //此处是关于dialog的title组件--目的是为了实现dialog的标题展示

DialogTitle.displayName = DialogPrimitive.Title.displayName; //此处是关于dialog的title组件的展示名称

const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>,React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({className,...props},ref) => (
    <DialogPrimitive.Description
     {...props} 
     ref={ref} 
     className={cn('text-sm text-muted-foreground',className)}
     />
)); //此处是关于dialog的description组件--目的是为了实现dialog的描述展示
DialogDescription.displayName = DialogPrimitive.Description.displayName; //此处是关于dialog的description组件的展示名称

export {
    Dialog,
    DialogPortal,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogOverlay
}