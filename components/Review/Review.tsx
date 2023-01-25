import classnames from 'classnames';
import React from 'react';
import { ReviewProps } from './Review.props';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Rating from '../Rating/Rating';
import Paragraph from '../Paragraph/Paragraph';

import styles from './Review.module.css';
import UserIcon from './user.svg';

const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
    const { name, title, description, createdAt, rating} = review;

    return (
        <div className={classnames(styles.review, className)} {...props}>
            <UserIcon className={styles.user}/>

            <div className={styles.title}>
                <span className={styles.name}>{name}:</span>
                &nbsp;&nbsp;
                <span>{title}</span>
            </div>

            <span className={styles.date}>
                {format(new Date(createdAt), "dd MMMM yyyy", {locale: ru})}
            </span>

            <Rating className={styles.rating} rating={rating} />
            <Paragraph className={styles.description} fontSize='small'>{description}</Paragraph>
        </div>
    );
};

export default Review;