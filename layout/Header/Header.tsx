import { HeaderProps } from "./Header.props";

const Header = ({...props}: HeaderProps): JSX.Element => {
    return (
        <div {...props}>
            Header
        </div>
    );
};

export default Header;