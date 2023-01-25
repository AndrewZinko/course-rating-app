import { ComponentPropsWithoutRef } from "react";
import { ReviewModel } from "../../interfaces/product.interface";

export interface ReviewProps extends ComponentPropsWithoutRef<'div'> {
    review: ReviewModel;
}