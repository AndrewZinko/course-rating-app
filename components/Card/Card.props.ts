import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface CardProps extends ComponentPropsWithoutRef<'div'>{
    color?: 'white' | 'blue';
    children: ReactNode;
}