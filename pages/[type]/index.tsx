import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {withLayout} from "../../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "node:querystring";

function Type({currentCategory}: TypeProps): JSX.Element {
    return (
        <>    
        </>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(menuItem => `/${menuItem.route}`),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory: currentCategoryItem.id
    });

    return {
        props: {
            menu,
            currentCategory: currentCategoryItem.id
        }
    };
};

interface TypeProps extends Record<string, unknown>{
    menu: MenuItem[];
    currentCategory: number;
}