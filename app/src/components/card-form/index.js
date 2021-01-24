import styles from './index.module.css';

const CardForm = (props) => {
    return (
        <form className={`${styles.card} ${props.big ? styles.bigCard : ''}`} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}

export default CardForm;
