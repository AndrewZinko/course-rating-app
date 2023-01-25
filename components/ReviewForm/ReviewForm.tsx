import { useState } from 'react';
import classnames from 'classnames';
import { ReviewFormProps } from './ReviewForm.props';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';
import Textarea from '../Textarea/Textarea';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';

const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
    const [isSentSuccess, setIsSentSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (formData: IReviewForm): Promise<void> => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.create, {
                productId,
                ...formData
            });

            if (data.message) {
                setIsSentSuccess(true);
                reset();
            } else {
                setErrorMessage('Что-то пошло не так при получении ответа от сервера! Попробуйте обновить страницу и повторить попытку.');
            }
        } catch (e) {
            setErrorMessage('При отправке данных что-то пошло не так! Попробуйте обновить страницу и повторить попытку.');
        }
    };

    const renderSuccessMessage = (): JSX.Element | null => {
        if (isSentSuccess) {
            return (
                <div className={classnames(styles.success, styles.panel)} role="alert">
                    <Heading tag="h3" className={styles.successTitle}>Ваш отзыв отправлен</Heading>
                    <Paragraph fontSize="small">Спасибо, ваш отзыв будет опубликован после проверки.</Paragraph>

                    <button 
                        className={styles.close} 
                        onClick={() => setIsSentSuccess(false)}
                        aria-label="Закрыть оповещение"
                    >
                        <CloseIcon />
                    </button>
                </div>
            );
        }

        return null;
    };

    const renderErrorMessage = (): JSX.Element | null => {
        if (errorMessage) {
            return (
                <div className={classnames(styles.error, styles.panel)} role="alert">
                    <Heading tag="h3" className={styles.successTitle}>Ошибка!</Heading>
                    <Paragraph fontSize="small">{errorMessage}</Paragraph>
                    
                    <button 
                        className={styles.close} 
                        onClick={() => setErrorMessage(null)}
                        aria-label="Закрыть оповещение"
                    >
                        <CloseIcon />
                    </button>
                </div>
            );
        }

        return null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classnames(styles.reviewForm, className)} {...props}>
                <Input 
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    placeholder='Имя'
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                
                <Input 
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    error={errors.title}
                    placeholder='Заголовок отзыва' 
                    className={styles.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.title ? true : false}
                />

                <div className={styles.rating}>
                    <span>Оценка:</span>
                    
                    <Controller
                        control={control}
                        name='rating'
                        rules={{required: { value: true, message: 'Поставьте оценку' } }}
                        render={({ field: { onChange, ref, value } }) => (
                            <Rating 
                                isEditable={true} 
                                rating={value} 
                                ref={ref} 
                                setRating={onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>

                <Textarea 
                    {...register('description', { required: { value: true, message: 'Заполните текст отзыва' } })}
                    error={errors.description}
                    placeholder='Текст отзыва' 
                    className={styles.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label="Текст отзыва"
                    aria-invalid={errors.description ? true : false}
                />

                <div className={styles.submit}>
                    <Button tabIndex={isOpened ? 0 : -1} color="primary" onClick={() => clearErrors()}>Отправить</Button>
                    <span className={styles.submitInfo}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>

            {renderSuccessMessage()}
            {renderErrorMessage()}
        </form>
    );
};

export default ReviewForm;