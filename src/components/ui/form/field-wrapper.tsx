import React from "react";
import { type FieldError } from "react-hook-form";

import { Error } from "./error";
import { Label } from "./label";

type FieldWrapperProps = {
    label?: string;
    className?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
}


export type FieldWrapperPassThroughProps = Omit<
    FieldWrapperProps,
     "className" | "children"
>//Omit函数用于从FieldWrapperProps中排除label、className、error和children属性

export const FieldWrapper = (props:FieldWrapperProps)=>{
    const {label, children, error} = props;
    return (
        <div>
           <Label>{label}
            <div className="mt-1">{children}</div>
           </Label>
           <Error errorMessage={error?.message} />
        </div>
    )
}