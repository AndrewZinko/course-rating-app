import { ComponentPropsWithoutRef } from "react";

export interface ReviewFormProps extends ComponentPropsWithoutRef<'div'> {
    productId: string;
    isOpened: boolean;
}