import { ComponentPropsWithoutRef } from "react";

export enum SortEnum {
    Rating,
    Price
}

export interface SortProps extends ComponentPropsWithoutRef<'div'>{
    sort: SortEnum,
    setSort: (sort: SortEnum) => void;
}