import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';

/*
open
onClearClose
title
action
actionName
*/

const DialogWindow = props => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    
    return (
        <Dialog open={props.open} scroll='paper' fullScreen={isMobile} fullWidth={true} maxWidth={props.maxWidth ? props.maxWidth : 'md'} onClose={props.onClearClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={styles.title} id='form-dialog-title'>{props.title}</DialogTitle>
            <DialogContent className={styles.dialog}>
                {props.children}
            </DialogContent>
            <DialogActions className={styles.actions}>
                <input className={styles.btn} type='button' onClick={props.onClearClose} value='Close' />
                <input className={styles.btn} type='button' onClick={props.action} value={props.actionName} />
            </DialogActions>
        </Dialog>
    );
}

export default DialogWindow;
