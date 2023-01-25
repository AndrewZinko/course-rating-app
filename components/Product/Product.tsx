import { ProductProps } from "./Product.props";
import Card from "../Card/Card";
import Heading from "../Heading/Heading";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import Image from 'next/image';
import { priceUAH, wordInflection } from "../../helpers/helpers";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import Paragraph from "../Paragraph/Paragraph";
import classnames from "classnames";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
import { motion } from 'framer-motion';
 
import styles from "./Product.module.css";

const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    };

    const renderDiscount = (): JSX.Element | null => {
        if (product.oldPrice) {
            return (
                <Tag className={styles.oldPrice} color="success">
                    <span className="visuallyHidden">скидка</span>
                    {priceUAH(product.price - product.oldPrice)}
                </Tag>
            );
        }

        return null;
    };

    const renderTags = (): JSX.Element[] => {
        return product.categories.map(category => {
            return <Tag key={category} className={styles.category} color="neutral-outlined">{category}</Tag>;
        });
    };

    const renderAdvantages = (): JSX.Element | null => {
        if (product.advantages) {
            return (
                <div className={styles.advantages}>
                    <Paragraph className={styles.advantageTitle}>Преимущества</Paragraph>
                    <Paragraph>{product.advantages}</Paragraph>
                </div>
            );
        }

        return null;
    };

    const renderDisadvantages = (): JSX.Element | null => {
        if (product.disadvantages) {
            return (
                <div className={styles.disadvantages}>
                    <div className={styles.advantageTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                </div>
            );
        }

        return null;
    };

    const renderFeatures = (): JSX.Element[] => {
        return product.characteristics.map(characteristic => {
            return (
                <div className={styles.characteristics} key={characteristic.name}>
                    <span className={styles.characteristicName}>{characteristic.name}</span>
                    <span className={styles.characteristicDots}/>
                    <span className={styles.characteristicValue}>{characteristic.value}</span>
                </div>
            );
        });
    };

    const renderReviews = (): JSX.Element[] => {
        return product.reviews.map(review => (
            <div key={review._id}>
                <Review review={review}/>
                <Divider/>
            </div>
        ));
    };

    const scrollToReview = (): void => {
        setReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        reviewRef.current?.focus({ 
            preventScroll: true 
        });
    };

    return (
        <div className={className} ref={ref} {...props}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image 
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>

                <Heading tag='h2' className={styles.title}>{product.title}</Heading>
                
                <div className={styles.price}>
                    <Heading tag='h3'>
                        <span className="visuallyHidden">цена</span>
                        {priceUAH(product.price)}
                    </Heading>

                    {renderDiscount()}
                </div>

                <div className={styles.credit}>
                    <Heading tag='h3'>
                        <span className="visuallyHidden">кредит</span>
                        {priceUAH(product.credit)}
                    </Heading>
                    /
                    <span className={styles.month}>мес</span>
                </div>

                <div className={styles.rating}>
                    <span className="visuallyHidden">{`Рейтинг ${product.reviewAvg ?? product.initialRating}`}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>

                <div className={styles.tags}>
                    {renderTags()}
                </div>

                <span className={styles.priceTitle} aria-hidden={true}>цена</span>
                <span className={styles.creditTitle} aria-hidden={true}>кредит</span>

                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview}>
                        {product.reviewCount} {wordInflection(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>

                <Divider className={styles.hr}/>

                <Paragraph className={styles.description} fontSize="medium">{product.description}</Paragraph>

                <div className={styles.features}>
                    {renderFeatures()}
                </div>

                <div className={styles.advantageBlock}>
                    {renderAdvantages()}
                    {renderDisadvantages()}
                </div>

                <Divider className={classnames(styles.hr, styles.hr2)}/>

                <div className={styles.actions}>
                    <Button color='primary'>Узнать подробнее</Button>
                    <Button 
                        className={styles.reviewButton} 
                        color='neutral' 
                        arrow={isReviewOpened ? 'down' : 'right'}
                        onClick={() => setReviewOpened(!isReviewOpened)}
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>

           <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial="hidden">
                <Card 
                    color="blue" 
                    className={classnames(styles.reviews, {
                        [styles.opened]: isReviewOpened,
                        [styles.closed]: !isReviewOpened,
                    })}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {renderReviews()}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>
           </motion.div>
        </div>
    );
}));

export default Product;