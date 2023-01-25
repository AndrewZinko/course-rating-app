import { ComponentPropsWithoutRef } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
    error?: FieldError;
}