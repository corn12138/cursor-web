import React from "react";
import { UseFormRegisterReturn } from 'react-hook-form'; // import the type

import { cn } from "@/utils/cn";

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';

type Option = {
    label: React.ReactNode;
    value: string | number | string[];
}; // define the type

type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const Select = (props: SelectFieldProps) => {
    const { label, options, error, className, defaultValue, registration } = props;

    return (
        <>
            <FieldWrapper label={label} error={error}>
                <select className={cn('mt-1 block w-full rounded-md border-gray-600 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm', className)}
                    defaultValue={defaultValue}
                    {...registration}
                >
                    {options.map(({ label, value }, index) => (
                        <option key={label?.toString()} value={value}>{label}</option>
                    ))}
                </select>
            </FieldWrapper>
        </>
    )
}// 这是一个通用的select组件，它接受一个options数组，这个数组里面的每个元素都是一个对象，包含label和value两个属性，这个组件会根据这个数组生成select的option