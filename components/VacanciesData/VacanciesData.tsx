import { VacanciesDataProps } from './VacanciesData.props';
import Card from '../Card/Card';

import styles from './VacanciesData.module.css';
import RateIcon from './rate.svg';
import { priceUAH } from '../../helpers/helpers';

const VacanciesData = ({ count, juniorSalary, middleSalary, seniorSalary }: VacanciesDataProps): JSX.Element => {
    return (
        <div className={styles.vacanciesInfo}>
            <Card className={styles.count}>
                <div className={styles.title}>Total Vacancies</div>
                <div className={styles.countValue}>{count}</div>
            </Card>

            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Junior</div>
                    <div className={styles.salaryValue}>{priceUAH(juniorSalary)}</div>

                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                        <RateIcon/>
                    </div>
                </div>

                <div>
                    <div className={styles.title}>Middle</div>
                    <div className={styles.salaryValue}>{priceUAH(middleSalary)}</div>

                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                    </div>
                </div>

                <div>
                    <div className={styles.title}>Senior</div>
                    <div className={styles.salaryValue}>{priceUAH(seniorSalary)}</div>

                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VacanciesData;