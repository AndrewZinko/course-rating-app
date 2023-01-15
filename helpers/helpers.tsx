import { FirstLevelMenuItem } from "../interfaces/menu.interface";
import { PageLevelCategory } from "../interfaces/course.interface";

import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";

export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Courses', icon: <CoursesIcon />, id: PageLevelCategory.Courses },
    { route: 'servises', name: 'Servises', icon: <ServicesIcon />, id: PageLevelCategory.Services },
    { route: 'books', name: 'Books', icon: <BooksIcon />, id: PageLevelCategory.Books },
    { route: 'products', name: 'Products', icon: <ProductsIcon />, id: PageLevelCategory.Products }
];