import { FooterProps } from "./Footer.props";
import classnames from "classnames";
import { format } from "date-fns";

import styles from "./Footer.module.css";


const Footer = ({className, ...props}: FooterProps): JSX.Element => {
    return (
        <footer className={classnames(styles.footer, className)} {...props}>
            <div className={styles.footerBlockCopyright}>
                OwlTop © 2020 - {format(new Date(), "yyyy")}. All right reserved.
            </div>

            <a href="#" className={styles.footerLinkTerms} target="_blank">
                Terms of Service
            </a>

            <a href="#" className={styles.footerLinkPolicy} target="_blank">
                Privacy policy
            </a>
        </footer>
    );
};

export default Footer;