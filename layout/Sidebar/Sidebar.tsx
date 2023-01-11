import { SidebarProps } from "./Sidebar.props";

const Sidebar = ({...props}: SidebarProps): JSX.Element => {
    return (
        <aside {...props}>
            sidebar
        </aside>
    );
};

export default Sidebar;