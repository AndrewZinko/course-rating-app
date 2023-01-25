import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
    color: 'primary' | 'neutral'
    children: ReactNode;
    arrow?: 'right' | 'down' | 'none'
}