import { GetStaticProps } from "next";
import {withLayout} from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";

function Search(): JSX.Element {
    return (
        <>    
        </>
    );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const defaultCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory: defaultCategory
    });

    return {
        props: {
            menu,
            currentCategory: defaultCategory
        }
    };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    currentCategory: number;
}