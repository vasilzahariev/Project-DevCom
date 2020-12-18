import styles from './index.module.css';

const CardForm = (props) => {
    return (
        <form className={styles.card} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}

export default CardForm;
