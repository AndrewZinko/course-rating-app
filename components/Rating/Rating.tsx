import classnames from "classnames";
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";
import { RatingProps } from "./Rating.props";

import styles from "./Rating.module.css";
import StarIcon from './star.svg';

const Rating = forwardRef(({isEditable = false, tabIndex, error, rating, setRating, className, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>(null);
    
    useEffect(() => {
        renderRating(rating);
    }, [rating, tabIndex]);
    
    const changeRatingDisplay = (temporaryRating: number) => {
        if (isEditable) {
            renderRating(temporaryRating);
        }
    };

    const handleClick = (rating: number) => {
        if (isEditable && setRating) {
            setRating(rating);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (isEditable && setRating) {
            const ratingUp = event.code === 'ArrowRight' || event.code === 'ArrowUp';
            const ratingDown = event.code === 'ArrowLeft' || event.code === 'ArrowDown';

            if (ratingUp) {
                event.preventDefault();
                
                if (rating) {
                    setRating(rating < 5 ? rating + 1 : 5);
                } else {
                    setRating(1);
                }

                setFocusOnRating('up');
            }
            
            if (ratingDown) {
                event.preventDefault();
                setRating(rating > 1 ? rating - 1 : 1);
                setFocusOnRating('down');
            }
        }
    };

    const computeFocus = (currentRating: number, index: number): number => {
        if (isEditable) {
            if (!rating && index === 0) {
                return tabIndex ?? 0;
            } else if (currentRating === index + 1) {
                return tabIndex ?? 0;
            }
		}

		return -1;
    };

    const setFocusOnRating = (type: 'up' | 'down') => {
        if (ratingArrayRef.current) {
            switch (type) {
                case 'up':
                    ratingArrayRef.current[rating]?.focus();
                    break;
                case 'down':
                    ratingArrayRef.current[rating - 2]?.focus();
                    break;
            }
        }
    };

    const renderRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((star: JSX.Element, index: number) => {
            return (
                <span
                    onMouseEnter={() => changeRatingDisplay(index + 1)}
                    onMouseLeave={() => changeRatingDisplay(rating)}
                    onClick={() => handleClick(index + 1)}
                    tabIndex={computeFocus(rating, index)}
                    onKeyDown={handleKeyDown}
                    className={classnames(styles.star, {
                        [styles.filled]: index < currentRating,
                        [styles.editable]: isEditable
                    })}
                    ref={ref => ratingArrayRef.current?.push(ref)}
                    role={isEditable ? "slider" : ""}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-valuemin={1}
                    aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
                    aria-invalid={error ? true : false}
                >
                    <StarIcon/>
                </span>
            );
        });

        setRatingArray(updatedArray);
    };

    return (
        <div 
            ref={ref} 
            className={classnames(className, styles.ratingWrapper, {
                [styles.error]: error
            })}
            {...props}
        >
            {ratingArray.map((star, index) => <span key={index}>{star}</span>)}
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span> }
        </div>
    );
});

export default Rating;