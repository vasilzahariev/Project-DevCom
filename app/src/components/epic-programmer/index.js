import styles from './index.module.css';

const EpicProgrammer = (props) => {
    return (
        <div className={styles.epicProgrammer}>
            {props.children}
        </div>
    );
}

export default EpicProgrammer;
