import { ForwardedRef, forwardRef } from 'react';
import { InputProps } from './Input.props';
import classnames from 'classnames';

import styles from './Input.module.css';

const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={classnames(className, styles.inputWrapper)}>
            <input type="text" className={classnames(styles.input, {
                [styles.error]: error
            })} ref={ref} {...props} />
            { error && <span role="alert" className={styles.errorMessage}>{error.message}</span> }
        </div>
    );
});

export default Input;