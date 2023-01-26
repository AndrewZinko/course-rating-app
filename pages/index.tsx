import { GetStaticProps } from "next";
import {withLayout} from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({menu, currentCategory}: HomeProps): JSX.Element {
    return (
        <></>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const defaultCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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