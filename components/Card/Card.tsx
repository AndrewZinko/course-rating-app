import classnames from 'classnames';
import { CardProps } from './Card.props';
import { ForwardedRef, forwardRef } from 'react';

import styles from './Card.module.css';

const Card = forwardRef(({color = 'white', children, className, ...props}: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div 
            className={classnames(className, styles.card, {
                [styles.blue]: color === 'blue',
            })}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
});

export default Card;