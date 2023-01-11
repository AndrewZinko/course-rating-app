import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ParagraphProps extends ComponentPropsWithoutRef<'p'> {
    fontSize?: 'small' | 'medium' | 'large',
    children: ReactNode
}