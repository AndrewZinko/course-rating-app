import { useEffect, useReducer } from 'react';
import { Advantages, Heading, Product, Sort, Tag, VacanciesData } from '../../components';
import { CoursePageComponentProps } from './CoursePageComponent.props';
import { PageLevelCategory } from '../../interfaces/course.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from '../../reducers';
import { wordInflection } from '../../helpers/helpers';
import { useReducedMotion } from 'framer-motion';

import styles from './CoursePageComponent.module.css';

const CoursePageComponent = ({ currentCategory, page, products }: CoursePageComponentProps): JSX.Element => {
    const [{sort, sortedProducts}, dispatch] = useReducer(sortReducer, {sort: SortEnum.Rating, sortedProducts: products});
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort: SortEnum) => {
        dispatch({type: sort});
    };

    useEffect(() => {
        dispatch({ type: 'reset', payload: products });
    }, [products]);

    const renderProducts = (): JSX.Element[] | null => {
        if (sortedProducts) {
            return sortedProducts.map(productItem => {
                return (
                    <Product role="listitem" layout={shouldReduceMotion ? false : true} key={productItem._id} product={productItem}/>
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

                <Tag 
                    color='neutral' 
                    size='medium'
                    aria-label={`${products.length} ${wordInflection(products.length, ['доступный курс', 'доступных курса', 'доступных курсов'])}`}
                >
                    {products.length}
                </Tag>

                <Sort sort={sort} setSort={setSort}/>
            </div>

            <div role="list">
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