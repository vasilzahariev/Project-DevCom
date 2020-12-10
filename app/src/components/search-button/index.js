import styles from './index.module.css';

const SearchButton = (props) => {
    return (
        <input className={styles.btn} type='submit' value='Search' disabled={props.searchVal === '' ? true : false} />
    );
}

export default SearchButton;
