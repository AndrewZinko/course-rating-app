import { HeaderProps } from "./Header.props";

const Header = ({...props}: HeaderProps): JSX.Element => {
    return (
        <header {...props}>
            Header
        </header>
    );
};

export default Header;