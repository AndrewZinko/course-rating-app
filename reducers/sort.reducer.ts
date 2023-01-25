import { SortEnum } from "../components/Sort/Sort.props";
import { ProductModel } from "../interfaces/product.interface";

export type SortActions = { type: SortEnum.Rating } 
                          | { type: SortEnum.Price } 
                          | { type: 'reset', payload: ProductModel[]};

export interface SortReducerState {
    sort: SortEnum;
    sortedProducts: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
    switch(action.type) {
        case SortEnum.Price:
            return {
                sort: SortEnum.Price,
                sortedProducts: state.sortedProducts.sort((a, b) => a.price > b.price ? -1 : 1)
            };
        case SortEnum.Rating:
            return {
                sort: SortEnum.Rating,
                sortedProducts: state.sortedProducts.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
            };
        case 'reset': 
            return {
                sort: SortEnum.Rating,
                sortedProducts: action.payload.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
            };
        default:
            throw new Error('There is no such action type in sortReducer!');
    }
}