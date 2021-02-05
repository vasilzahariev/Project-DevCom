import styles from './index.module.css';

const EpicProgrammer = (props) => {
    return (
        <span className={styles.epicProgrammer}>
            {props.children}
        </span>
    );
}

export default EpicProgrammer;
