import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { cn } from "@/utils/cn";

export const Link = ({ className, children, ...props }: LinkProps) => {
    return (
        <RouterLink
            {...props}
            className={cn('text-slate-600 hover:text-slate-900', className)}
            {...props}
        >
            {children}
        </RouterLink>
    )
}