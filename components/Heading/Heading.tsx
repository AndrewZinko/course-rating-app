import { HeadingProps } from './Heading.props';
import classnames from 'classnames';
import styles from './Heading.module.css';

const Heading = ({tag, children, className, ...props}: HeadingProps): JSX.Element => {
    switch(tag) {
        case 'h1':
            return <h1 className={classnames(className, styles.h1)} {...props}>{children}</h1>;
        case 'h2':
            return <h2 className={classnames(className, styles.h2)} {...props}>{children}</h2>;
        case 'h3':
            return <h3 className={classnames(className, styles.h3)} {...props}>{children}</h3>;
        default:
            throw new Error('There is no such tag parameter!');
    }
};

export default Heading;