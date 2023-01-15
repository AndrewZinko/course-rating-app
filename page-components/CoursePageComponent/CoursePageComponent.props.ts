import { PageLevelCategory, CourseModel } from "../../interfaces/course.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface CoursePageComponentProps {
    currentCategory: PageLevelCategory;
    page: CourseModel;
    products: ProductModel[];
}