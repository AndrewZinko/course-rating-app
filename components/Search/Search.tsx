import { useState, KeyboardEvent } from "react";
import { SearchProps } from "./Search.props";
import Button from "../Button/Button";
import Input from "../Input/Input";
import classnames from "classnames";

import styles from './Search.module.css';
import SearchIcon from './glass.svg';
import { useRouter } from "next/router";

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>('');
    const router = useRouter();

    const goToSearchHandler = () => {
        router.push({
            pathname: '/search',
            query: {
                q: searchInput
            }
        });
    };

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            goToSearchHandler();
        }
    };

    return (
        <form className={classnames(styles.search, className)} {...props} role="search">
            <Input
                className={styles.input} 
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={onKeyDownHandler}
                />

            <Button 
                color="primary"
                className={styles.button}
                onClick={goToSearchHandler}
                aria-label="Искать по сайту"
            >
                <SearchIcon/>
            </Button>
        </form>
    );
};

export default Search;