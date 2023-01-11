import classnames from "classnames";
import { ParagraphProps } from "./Paragraph.props";
import styles from "./Paragraph.module.css";

const Paragraph = ({fontSize = 'medium', children, className, ...props}: ParagraphProps) => {
    return (
        <p className={classnames(styles.paragraph, className, {
                [styles.small]: fontSize === 'small',
                [styles.medium]: fontSize === 'medium',
                [styles.large]: fontSize === 'large'
            })}
            {...props}>
            {children}
        </p>
    );
};

export default Paragraph;