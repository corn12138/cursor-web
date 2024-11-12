import { Slot } from "@radix-ui/react-slot"; // 这是一个Radix UI的插槽组件
import { cva, type VariantProps } from "class-variance-authority"; //此插件的作用是创建一个类名变量
import React from "react";

import { cn } from "@/utils/cn";

import { Spinner } from "../spinner"; // 这是一个自定义的Spinner组件

// buttonVariants是一个类名变量，用于创建按钮的类名
const buttonVariants = cva('inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-600 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-600 focus:ring-primary-500 transition duration-150 ease-in-out', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: 'h-9 px-4 py-2',
            sm: 'h-8 rounded-md px-3 text-xs',
            md: 'text-base px-4 py-2',
            lg: 'h-10 rounded-md px-8',
            icon: 'size-9'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    },
});
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean; // asChild是一个布尔值，表示是否作为子元素
    isLoading?: boolean; // isLoading是一个布尔值，表示是否正在加载
    icon?: React.ReactNode; // icon是一个React节点，表示图标
};

//这一步的目的是将Button组件的props类型定义为ButtonProps
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant,
    size,
    asChild = false,
    children,
    isLoading,
    icon,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : 'button';
    // Comp是一个React组件，根据asChild的值来决定是Slot还是button
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {isLoading && <Spinner size="sm" className="text-current" />}
            {!isLoading && icon && <span className="mr-2">{icon}</span>}
            <span className="mx-2">{children}</span>
        </Comp>
    );
})

Button.displayName = 'Button'; // Button的显示名称是Button
export { Button, buttonVariants }; // 导出Button和buttonVariants