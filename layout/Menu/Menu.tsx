import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import classnames from "classnames";
import { motion, useReducedMotion } from 'framer-motion';

import styles from "./Menu.module.css";

const Menu = (): JSX.Element => {
    const { menu, setMenu, currentCategory: currentCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'opened' | 'closed' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();
    
    const variants = {
        visible: { marginBottom: 20 },
        hidden: { marginBottom: 0 }
    };

    const childrenVariants = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: { 
            opacity: shouldReduceMotion ? 1 : 0,
            height: 0
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        const newMenu = menu.map(menuItem => {
            if (menuItem._id.secondCategory === secondCategory) {
                setAnnounce(menuItem.isOpened ? 'closed' : 'opened');
                menuItem.isOpened = !menuItem.isOpened;
            }

            return menuItem;
        });
        
        if (setMenu) {
            setMenu(newMenu);
        }
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const renderFirstLevel = (): JSX.Element => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(firstLevelMenuItem => (
                    <li key={firstLevelMenuItem.route} aria-expanded={firstLevelMenuItem.id === currentCategory}>

                        <Link href={`/${firstLevelMenuItem.route}`}>
                            <div className={classnames(styles.firstLevel, {
                                [styles.firstLevelActive]: firstLevelMenuItem.id === currentCategory
                            })}>
                                {firstLevelMenuItem.icon}
                                <span>{firstLevelMenuItem.name}</span>
                            </div>
                        </Link>

                        {firstLevelMenuItem.id === currentCategory && renderSecondLevel(firstLevelMenuItem)}
                    </li>
                ))}
            </ul>
        );
    };

    const renderSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(secondLevelMenuItem => {
                    const pageAliasArray = secondLevelMenuItem.pages.map(page => page.alias);
                    const aliasToFind = router.asPath.split('/')[2];

                    if (pageAliasArray.includes(aliasToFind)) {
                        secondLevelMenuItem.isOpened = true;
                    }

                    return (
                        <li key={secondLevelMenuItem._id.secondCategory}>
                            <button
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(secondLevelMenuItem._id.secondCategory)}
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, secondLevelMenuItem._id.secondCategory)}
                                aria-expanded={secondLevelMenuItem.isOpened}
                            >
                                {secondLevelMenuItem._id.secondCategory}
                            </button>

                            <motion.ul
                                layout
                                variants={variants}
                                initial={secondLevelMenuItem.isOpened ? 'visible' : 'hidden'}
                                animate={secondLevelMenuItem.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                            >
                                {renderThirdLevel(secondLevelMenuItem.pages, firstLevelMenuItem.route, secondLevelMenuItem.isOpened)}
                            </motion.ul>

                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderThirdLevel = (pages: PageItem[], route: string, isOpened: boolean | undefined): JSX.Element => {
        return (
            <>
                {pages.map(page => (
                   <motion.li 
                        key={page.category}
                        initial={isOpened ? 'visible' : 'hidden'}
                        animate={isOpened ? 'visible' : 'hidden'}
                        variants={childrenVariants}
                    >
                        <Link
                            tabIndex={isOpened ? 0 : -1} 
                            href={`/${route}/${page.alias}`}
                            className={classnames(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath
                            })}
                            aria-current={`/${route}/${page.alias}` === router.asPath ? "page" : false}
                        >
                            {page.category.length > 20 ? `${page.category.slice(0, 20)}...` : page.category}
                        </Link>
                   </motion.li>
                ))}
            </>
        );
    };

    return (
        <nav role="navigation">
            {announce && <span role="log" className="visuallyHidden">{announce === 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {renderFirstLevel()}
        </nav>
    );
};

export default Menu;