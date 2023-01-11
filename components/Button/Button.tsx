import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import classnames from 'classnames';

import ArrowIcon from './arrow.svg';

const Button = ({arrow = 'none', color, children, className, ...props}: ButtonProps): JSX.Element => {
    const renderArrow = (): JSX.Element | null => {
        if (arrow !== 'none') {
            return (
                <span 
                    className={classnames(styles.arrow, {
                        [styles.down]: arrow === 'down',
                        [styles.right]: arrow === 'right'
                    })}>
                        <ArrowIcon/>
                </span>
            );
        }

        return null;
    };

    return (
        <button 
                className={classnames(styles.button, className, {
                    [styles.primary]: color === 'primary',
                    [styles.neutral]: color === 'neutral'
                })} 
                {...props}
            >
            {children}
            {renderArrow()}
        </button>
    );
};

export default Button;