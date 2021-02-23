import styles from './index.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

/*
open
onClearClose
title
action
actionName
*/

const DialogWindow = props => {
    return (
        <Dialog open={props.open} scroll='paper' fullWidth={true} maxWidth='md' onClose={props.onClearClose} aria-labelledby="form-dialog-title">
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
