import { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import classnames from "classnames";
import { Up } from "../components";
import { LayoutProps } from "./Layout.props";
import { AppContextProvider, IAppContext } from "../context/app.context";

import styles from "./Layout.module.css";

const Layout = ({children}: LayoutProps) => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            mainRef.current?.focus();
        }

        setIsSkipLinkDisplayed(false);
    };
    
    return (
        <div className={styles.wrapper}>
            <a
                onFocus={() => setIsSkipLinkDisplayed(true)}
                onKeyDown={(key: KeyboardEvent) => skipContentAction(key)}
                tabIndex={1} 
                className={classnames(styles.skipLink, {
                    [styles.displayed]: isSkipLinkDisplayed
                })}
            >
                Сразу к содержанию
            </a>

            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>

            <main className={styles.main} ref={mainRef} tabIndex={0} role="main">
                {children}
            </main>

            <Footer className={styles.footer}/>
            <Up/>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} currentCategory={props.currentCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};
