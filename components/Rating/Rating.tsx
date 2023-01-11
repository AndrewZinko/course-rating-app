import classnames from "classnames";
import { useEffect, useState, KeyboardEvent } from "react";
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from './star.svg';

const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    
    useEffect(() => {
        renderRating(rating);
    }, [rating]);
    
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

    const handleKeyDown = (rating: number, event: KeyboardEvent<SVGAElement>) => {
        const correctKey = event.code === 'Space' || event.code === 'Enter';

        if (correctKey && setRating) {
            setRating(rating);
        }
    };

    const renderRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((star: JSX.Element, index: number) => {
            return (
                <StarIcon
                    onMouseEnter={() => changeRatingDisplay(index + 1)}
                    onMouseLeave={() => changeRatingDisplay(rating)}
                    onClick={() => handleClick(index + 1)}
                    tabIndex={isEditable ? 0 : -1}
                    onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleKeyDown(index + 1, e)}
                    className={classnames(styles.star, {
                        [styles.filled]: index < currentRating,
                        [styles.editable]: isEditable
                    })}
                />
            );
        });

        setRatingArray(updatedArray);
    };

    return (
        <div {...props}>
            {ratingArray.map((star, index) => <span key={index}>{star}</span>)}
        </div>
    );
};

export default Rating;