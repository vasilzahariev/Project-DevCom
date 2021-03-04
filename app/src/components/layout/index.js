import styles from './index.module.css'
import Header from '../header'

const Layout = (props) => {
    return (
        <div className={styles.container}>
            <Header />

            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
