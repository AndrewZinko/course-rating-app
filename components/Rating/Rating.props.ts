import { ComponentPropsWithoutRef } from "react";

export interface RatingProps extends ComponentPropsWithoutRef<'div'> {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
}