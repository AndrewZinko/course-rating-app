import React from 'react';
import { SortEnum, SortProps } from './Sort.props';
import classnames from 'classnames';

import styles from './Sort.module.css';
import SortIcon from './sort.svg';

const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {
    return (
        <div className={classnames(styles.sort, className)} {...props}>
            <span
                onClick={() => setSort(SortEnum.Rating)}
                className={classnames({
                    [styles.active]: sort === SortEnum.Rating,
                })}>
                <SortIcon className={styles.sortIcon}/>
                By&nbsp;rate
            </span>
            
            <span
                onClick={() => setSort(SortEnum.Price)}
                className={classnames({
                    [styles.active]: sort === SortEnum.Price,
                })}>
                <SortIcon className={styles.sortIcon}/>
                By&nbsp;price
            </span>
        </div>
    );
};

export default Sort;