import React, { forwardRef } from "react";
import { type UseFormRegisterReturn } from 'react-hook-form'; // 这是一个类型定义文件

import { cn } from "@/utils/cn";

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps & {
    className?: string;
    registration?: Partial<UseFormRegisterReturn>; // 这是一个类型定义文件
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, registration, ...props }, ref) => {
    return (
        <>
            <FieldWrapper
                label={label}
                error={error}
            >
                <input
                    type={type}
                    className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}
                    ref={ref}
                    {...registration}
                    {...props}
                >
                </input>
            </FieldWrapper>
        </>
    )
})
Input.displayName = "Input"; // 设置组件的显示名称
export { Input }; // 导出Input组件