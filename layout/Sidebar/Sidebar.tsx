import Menu from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import classnames from "classnames";

import styles from "./Sidebar.module.css";
import Logo from "../logo.svg";

const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <aside className={classnames(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo}/>
            <div>Search</div>
            <Menu />
        </aside>
    );
};

export default Sidebar;