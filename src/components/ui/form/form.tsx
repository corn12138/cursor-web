import { zodResolver } from '@hookform/resolvers/zod';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import React, { createContext, forwardRef, useContext, useId } from 'react';

import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    SubmitHandler,
    UseFormProps,
    UseFormReturn,
    useForm,
    useFormContext, // 这是一个React Hook，用于获取FormProvider的值
} from 'react-hook-form' // 这是一个React Hook库，用于处理表单

import { z, ZodType } from 'zod'; // 这是一个用于验证数据的库

import { cn } from '@/utils/cn'; // 这是一个工具函数，用于处理CSS类名
import { Label } from './label'; // 这是一个Label组件，用于渲染表单标签

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues
> = FieldPath<TFieldValues
>> = {
    name: TName;
} // 这是一个FormFieldContextValue类型

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue); // 创建一个FormFieldContext上下文

const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => {
    return (
        <>
            <FormFieldContext.Provider value={{ name: props.name }}>
                <Controller {...props} /></FormFieldContext.Provider>
        </>
    )
} // 这是一个FormField组件，用于渲染表单字段

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue,
); // 创建一个FormItemContext上下文
const useFormField = () => {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext?.name, formState);

    if (!fieldContext) {
        throw new Error('useFormField must be used within a FormField');
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    }
};

const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const id = useId(); //
    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn('space-y-2', className)} {...props}></div>
        </FormItemContext.Provider>
    )
}); //
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-[0.8rem] text-muted-foreground', className)}
            {...props}
        />
    );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
        return null;
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('text-[0.8rem] font-medium text-destructive', className)}
            {...props}
        >
            {body}
        </p>
    );
});
FormMessage.displayName = 'FormMessage';

type FormProps<TFormValues extends FieldValues, Schema> = {
    onSubmit: SubmitHandler<TFormValues>;
    schema: Schema;
    className?: string;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
};

const Form = <
    Schema extends ZodType<any, any, any>,
    TFormValues extends FieldValues = z.infer<Schema>,
>({
    onSubmit,
    children,
    className,
    options,
    id,
    schema,
}: FormProps<TFormValues, Schema>) => {
    const form = useForm({ ...options, resolver: zodResolver(schema) });
    return (
        <FormProvider {...form}>
            <form
                className={cn('space-y-6', className)}
                onSubmit={form.handleSubmit(onSubmit)}
                id={id}
            >
                {children(form)}
            </form>
        </FormProvider>
    );
};

export {
    useFormField,
    Form,
    FormProvider,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
