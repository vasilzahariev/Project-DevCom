import styles from './index.module.css';
import { Grid, Collapse } from '@material-ui/core';
import SimpleTextBtn from '../simple-text-btn';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import EpicProgrammer from '../epic-programmer';
import { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import SubmitBtn from '../submit-btn';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const RenderedDevlogCard = props => {
    const userContext = useContext(UserContext);

    const date = new Date(Date.parse(`${props.devlog.publishedDate}`));

    const content = useRef(null);

    const [show, setShow] = useState(false);

    useEffect(() => {
        content.current.innerHTML = props.devlog.content;
    }, [props.devlog]);

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <Grid container justify="space-between" alignItems='center'>
                    <Grid item>
                        <p>{props.index + 1} | <EpicProgrammer>{props.devlog.title}</EpicProgrammer></p>
                    </Grid>
                    <Grid item>
                        {show ? <SimpleTextBtn onClick={() => setShow(false)}>Show Less <ArrowDropUpIcon /></SimpleTextBtn> : <SimpleTextBtn onClick={() => setShow(true)}>Show More <ArrowDropDownIcon /></SimpleTextBtn>}
                    </Grid>
                </Grid>
                <Collapse in={show}>
                    <div className={styles.content} style={{ display: show ? '' : 'none' }} ref={content}></div>
                    <div className={styles.right} style={{ display: show ? '' : 'none' }}><EpicProgrammer>Published on:</EpicProgrammer> {date.toLocaleDateString()}</div>
                </Collapse>
                {/* TODO: Add functionalities */}
                {props.checkIfUserIsMember() ? <div className={styles.edit} style={{ display: show ? '' : 'none' }}><SubmitBtn color='red' borderRadius='100%'><DeleteIcon /></SubmitBtn> <SubmitBtn color='yellow' borderRadius='100%'><EditIcon /></SubmitBtn></div> : ''}
            </div>
        </Grid>
    );
}

export default RenderedDevlogCard;
