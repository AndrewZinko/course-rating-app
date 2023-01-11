import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
    size?: 'small' | 'medium',
    children: ReactNode,
    color?: 'neutral-outlined' | 'neutral' | 'danger' | 'success' | 'primary-outlined'
    href?: string;
}