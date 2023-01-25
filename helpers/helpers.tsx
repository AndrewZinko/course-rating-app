import { FirstLevelMenuItem } from "../interfaces/menu.interface";
import { PageLevelCategory } from "../interfaces/course.interface";
import { Convert } from "easy-currencies";

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

export const priceUAH = (price: number) => {
    const priceUAH = Math.floor(price * 0.55);
    return priceUAH.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₴');
};

export const wordInflection = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};