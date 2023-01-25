import { ComponentPropsWithoutRef } from "react";
import ArrowUp from './arrow-up.svg';
import Close from './close.svg';
import Menu from './menu.svg';

export const icons = {
    ArrowUp,
    Close,
    Menu
};

export type Icon = keyof typeof icons;

export interface ButtonIconProps extends ComponentPropsWithoutRef<'button'> {
    color: 'primary' | 'white';
    icon: Icon;
}