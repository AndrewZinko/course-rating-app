import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

import styles from './Up.module.css';

const Up = (): JSX.Element => {
    const yPosition = useScrollY();
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ opacity: yPosition / document.body.scrollHeight });   
    }, [yPosition, controls]);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.div
            animate={controls} 
            className={styles.up}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon color="primary" icon="ArrowUp" onClick={scrollToTop}/>
        </motion.div>
    );
};

export default Up;