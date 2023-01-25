import { ComponentPropsWithoutRef } from "react";
import { ProductModel } from "../../interfaces/product.interface";

export interface ProductProps extends ComponentPropsWithoutRef<'div'> {
    product: ProductModel;
}