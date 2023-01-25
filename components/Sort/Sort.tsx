import React from 'react';
import { SortEnum, SortProps } from './Sort.props';
import classnames from 'classnames';

import styles from './Sort.module.css';
import SortIcon from './sort.svg';

const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {
    return (
        <div className={classnames(styles.sort, className)} {...props}>
            <span className={styles.sortName} id="sort">Сортировка</span>
            <button
                id="rating"
                onClick={() => setSort(SortEnum.Rating)}
                className={classnames({
                    [styles.active]: sort === SortEnum.Rating,
                })}
                aria-selected={sort === SortEnum.Rating}
                aria-labelledby="sort rating"
            >
                <SortIcon className={styles.sortIcon}/>
                По рейтингу
            </button>
            
            <button
                id="price"
                onClick={() => setSort(SortEnum.Price)}
                className={classnames({
                    [styles.active]: sort === SortEnum.Price,
                })}
                aria-selected={sort === SortEnum.Price}
                aria-labelledby="sort price"
            >
                <SortIcon className={styles.sortIcon}/>
                По цене
            </button>
        </div>
    );
};

export default Sort;