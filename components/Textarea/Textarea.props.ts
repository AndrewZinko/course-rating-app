import { ComponentPropsWithoutRef } from "react";
import { FieldError } from "react-hook-form";

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    error?: FieldError;
}