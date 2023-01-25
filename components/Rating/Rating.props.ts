import { ComponentPropsWithoutRef } from "react";
import { FieldError } from "react-hook-form";

export interface RatingProps extends ComponentPropsWithoutRef<'div'> {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
    error?: FieldError;
}