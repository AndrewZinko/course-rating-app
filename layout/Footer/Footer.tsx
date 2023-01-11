import { FooterProps } from "./Footer.props";

const Footer = ({...props}: FooterProps): JSX.Element => {
    return (
        <div {...props}>
            Footer
        </div>
    );
};

export default Footer;