import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    color: 'primary' | 'neutral'
    children: ReactNode;
    arrow?: 'right' | 'down' | 'none'
}