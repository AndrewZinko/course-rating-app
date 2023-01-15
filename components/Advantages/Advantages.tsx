import React from 'react';
import { AdvantagesProps } from './Advantages.props';

import styles from './Advantages.module.css';
import CheckIcon from './check.svg';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';

const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    const renderAdvantages = (): JSX.Element[] => {
        return advantages.map(advantage => {
            return (
                <div key={advantage._id} className={styles.advantage}>
                    <CheckIcon/>
                    <Heading className={styles.title} tag='h3'>{advantage.title}</Heading>
                    <div className={styles.vlineWrapper}>
                        <hr className={styles.vline}/>
                    </div>
                    <Paragraph fontSize='large'>{advantage.description}</Paragraph>
                </div>
            );
        });
    };

    return (
        <>
            {renderAdvantages()}   
        </>
    );
};

export default Advantages;