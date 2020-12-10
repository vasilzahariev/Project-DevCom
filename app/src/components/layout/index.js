import styles from './index.module.css'
import Header from '../header'

const Layout = (props) => {
    return (
        <div className={styles.container}>
            <Header />

            <div>
                {props.children}
            </div>

            {/* TODO: Insert Footer here when created */}
        </div>
    )
}

export default Layout;
