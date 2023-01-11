import classnames from "classnames";
import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";

const Tag = ({size = 'small', children, color = 'neutral-outlined', href, className, ...props}: TagProps): JSX.Element => {
    const renderTagChildren = (): JSX.Element => {
        if (href) {
            return <a href={href}>{children}</a>;
        }

        return <>{children}</>;
    };
    
    return (
        <div className={classnames(styles.tag, className, {
                [styles.small]: size === 'small',
                [styles.medium]: size === 'medium',
                [styles.neutral]: color === 'neutral',
                [styles.neutral_outlined]: color === 'neutral-outlined',
                [styles.danger]: color === 'danger',
                [styles.success]: color === 'success',
                [styles.primary_outlined]: color === 'primary-outlined',
            })}
            {...props}>
            {renderTagChildren()}
        </div>
    );
};

export default Tag;