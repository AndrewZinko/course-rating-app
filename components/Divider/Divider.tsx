import React from 'react';
import { DividerProps } from './Divider.props';
import classnames from 'classnames';

import styles from './Divider.module.css';

const Divider = ({className, ...props}: DividerProps): JSX.Element => {
    return (
        <hr className={classnames(className, styles.hr)} {...props}/>
    );
};

export default Divider;