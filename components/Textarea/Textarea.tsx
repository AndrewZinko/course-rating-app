import { ForwardedRef, forwardRef } from 'react';
import { TextareaProps } from './Textarea.props';
import classnames from 'classnames';

import styles from './Textarea.module.css';

const Textarea = forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={classnames(className, styles.textareaWrapper)}>
            <textarea className={classnames(styles.textarea, {
                [styles.error]: error
            })} ref={ref} {...props}/>
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span> }
        </div>
    );
});

export default Textarea;