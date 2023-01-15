import React, { useReducer } from 'react';
import { Advantages, Heading, Sort, Tag, VacanciesData } from '../../components';
import { CoursePageComponentProps } from './CoursePageComponent.props';

import styles from './CoursePageComponent.module.css';
import { PageLevelCategory } from '../../interfaces/course.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from '../../reducers';

const CoursePageComponent = ({ currentCategory, page, products }: CoursePageComponentProps): JSX.Element => {
    const [{sort, sortedProducts}, dispatch] = useReducer(sortReducer, {sort: SortEnum.Rating, sortedProducts: products});

    const setSort = (sort: SortEnum) => {
        dispatch({type: sort});
    };

    const renderProducts = (): JSX.Element[] | null => {
        if (sortedProducts) {
            return sortedProducts.map(productItem => {
                return (
                    <div key={productItem._id}>
                        {productItem.title}
                    </div>
                );
            });
        }

        return null;
    };

    const renderAdvantages = (): JSX.Element | null => {
        if (page.advantages && page.advantages.length > 1) {
            return (
                <>
                    <Heading tag='h2'>Advantages</Heading>
                    <Advantages advantages={page.advantages}/>
                </>
            );
        }

        return null;
    };

    const renderTags = () => {
        return page.tags.map(tag => {
            return <Tag key={tag} color="primary-outlined">{tag}</Tag>;
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Heading tag='h1'>{page.title}</Heading>
                <Tag color='neutral' size='medium'>{products.length}</Tag>

                <Sort sort={sort} setSort={setSort}/>
            </div>

            <div>
                {renderProducts()}
            </div>

            <div className={styles.vacancyTitle}>
                <Heading tag='h2'>Vacancies - {page.category}</Heading>
                <Tag color='danger' size='medium'>work.ua</Tag>
            </div>

            {currentCategory === PageLevelCategory.Courses && page.hh && <VacanciesData {...page.hh}/>}

            {renderAdvantages()}

            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}

            <Heading tag='h2'>Acquired Skills</Heading>

            {renderTags()}
        </div>
    );
};

export default CoursePageComponent;