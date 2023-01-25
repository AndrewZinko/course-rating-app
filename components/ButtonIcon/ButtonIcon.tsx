import classnames from 'classnames';
import { ButtonIconProps, icons } from './ButtonIcon.props';

import styles from './ButtonIcon.module.css';

const ButtonIcon = ({ color, icon, className, ...props }: ButtonIconProps): JSX.Element => {
    const IconComponent = icons[icon];

    return (
        <button
            className={classnames(styles.button, className, {
                [styles.primary]: color === 'primary',
                [styles.white]: color === 'white'
            })}
            {...props}
        >
            <IconComponent/>
        </button>
    );
};

export default ButtonIcon;