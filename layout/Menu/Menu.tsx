import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";

import styles from "./Menu.module.css";
import classnames from "classnames";

const Menu = (): JSX.Element => {
    const { menu, setMenu, currentCategory: currentCategory } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        const newMenu = menu.map(menuItem => {
            if (menuItem._id.secondCategory === secondCategory) {
                menuItem.isOpened = !menuItem.isOpened;
            }

            return menuItem;
        });
        
        if (setMenu) {
            setMenu(newMenu);
        }
    };

    const renderFirstLevel = (): JSX.Element => {
        return (
            <>
                {firstLevelMenu.map(firstLevelMenuItem => (
                    <div key={firstLevelMenuItem.route}>

                        <Link href={`/${firstLevelMenuItem.route}`}>
                            <div className={classnames(styles.firstLevel, {
                                [styles.firstLevelActive]: firstLevelMenuItem.id === currentCategory
                            })}>
                                {firstLevelMenuItem.icon}
                                <span>{firstLevelMenuItem.name}</span>
                            </div>
                        </Link>

                        {firstLevelMenuItem.id === currentCategory && renderSecondLevel(firstLevelMenuItem)}
                    </div>
                ))}
            </>
        );
    };

    const renderSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(secondLevelMenuItem => {
                    const pageAliasArray = secondLevelMenuItem.pages.map(page => page.alias);
                    const aliasToFind = router.asPath.split('/')[2];

                    if (pageAliasArray.includes(aliasToFind)) {
                        secondLevelMenuItem.isOpened = true;
                    }

                    return (
                        <div key={secondLevelMenuItem._id.secondCategory}>
                            <div 
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(secondLevelMenuItem._id.secondCategory)}>
                                {secondLevelMenuItem._id.secondCategory}
                            </div>

                            <div className={classnames(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: secondLevelMenuItem.isOpened
                            })}>
                                {renderThirdLevel(secondLevelMenuItem.pages, firstLevelMenuItem.route)}
                            </div>

                        </div>
                    );
                })}
            </div>
        );
    };

    const renderThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
        return (
            <>
                {pages.map(page => (
                    <Link 
                        href={`/${route}/${page.alias}`}
                        key={page.category}
                        className={classnames(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                        })}>
                        {page.category}
                    </Link>
                ))}
            </>
        );
    };

    return renderFirstLevel();
};

export default Menu;