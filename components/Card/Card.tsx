import classnames from 'classnames';
import { CardProps } from './Card.props';

import styles from './Card.module.css';

const Card = ({color = 'white', children, className, ...props}: CardProps): JSX.Element => {
    return (
        <div className={classnames(className, styles.card, {
                [styles.blue]: color === 'blue',
            })}
            {...props}>
            {children}
        </div>
    );
};

export default Card;