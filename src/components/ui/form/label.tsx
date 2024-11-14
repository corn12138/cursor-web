import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react'

import { cn } from "@/utils/cn";

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');//使用cva函数创建一个变体

const Label = forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive
    .Root> & VariantProps<typeof labelVariants>>(({ className, ...props }, ref) => (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(labelVariants(), className)}
            {...props}
        />
    )); //使用cn函数将变体应用于className
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };