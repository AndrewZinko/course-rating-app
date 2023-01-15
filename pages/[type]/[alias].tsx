import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import axios from 'axios';
import { CourseModel, PageLevelCategory } from "../../interfaces/course.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";

function Course({menu, page, products}: CourseProps): JSX.Element {
    return (
        <>    
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    for (const menuItem of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: menuItem.id
        });

        paths = paths.concat(menu.flatMap(m => m.pages.map(p => `/${menuItem.route}/${p.alias}`)));
    }

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }

    const currentCategoryItem = firstLevelMenu.find(menuItem => menuItem.route === params.type);

    if (!currentCategoryItem) {
        return {
            notFound: true
        };
    }
    
    try {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: currentCategoryItem.id
        });

        if (menu.length === 0) {
            return {
                notFound: true
            };
        }

        const {data: page} = await axios.get<CourseModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
        const {data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
            category: page.category,
            limit: 10
        });

        return {
            props: {
                menu,
                currentCategory: currentCategoryItem.id,
                page,
                products
            }
        };
    } catch {
        return {
            notFound: true
        };
    }
};

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    currentCategory: PageLevelCategory;
    page: CourseModel;
    products: ProductModel[];
}