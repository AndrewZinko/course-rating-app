import { createContext, PropsWithChildren, useState } from "react";
import { PageLevelCategory } from "../interfaces/course.interface";
import { MenuItem } from "../interfaces/menu.interface";

export interface IAppContext {
    menu: MenuItem[];
    currentCategory: PageLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
    menu: [],
    currentCategory: PageLevelCategory.Courses
});

export const AppContextProvider = ({menu, currentCategory, children}: PropsWithChildren<IAppContext>): JSX.Element => {
    const [menuState, setMenuState] = useState<MenuItem[]>(menu);

    const setMenu = (newMenu: MenuItem[]) => {
        setMenuState(newMenu);
    };

    return <AppContext.Provider value={{ menu: menuState, currentCategory, setMenu }}>
        {children}
    </AppContext.Provider>;
};