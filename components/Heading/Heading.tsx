import { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';

const Heading = ({tag, children}: HeadingProps): JSX.Element => {
    switch(tag) {
        case 'h1':
            return <h1 className={styles.h1}>{children}</h1>;
        case 'h2':
            return <h2 className={styles.h2}>{children}</h2>;
        case 'h3':
            return <h3 className={styles.h3}>{children}</h3>;
        default:
            throw new Error('There is no such tag parameter!');
    }
};

export default Heading;