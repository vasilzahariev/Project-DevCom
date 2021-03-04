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
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import EditDevlogDialog from '../edit-devlog-dialog';

const RenderedDevlogCard = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const date = new Date(Date.parse(`${props.devlog.publishedDate}`));

    const history = useHistory();

    const content = useRef(null);
    const elem = useRef(null);

    const [ended, setEnded] = useState(false);
    const [show, setShow] = useState(props.devlog._id === props.selectedDevlogId);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        content.current.innerHTML = props.devlog.content;
        
        if (!ended && props.devlog._id === props.selectedDevlogId) elem.current.scrollIntoView();
        
        setEnded(true);
    }, [props.devlog, props.selectedDevlogId]);

    const onDeleteClick = async e => {
        if (!window.confirm(`Are you sure you want to delete devlog with name: "${props.devlog.title}"`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/project/deleteDevlog/${props.devlog._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        if (!response.status) history.push('/500');
    }

    return (
        <Grid item xs={12}>
            <div className={styles.card} ref={elem}>
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
                {props.checkIfUserIsMember() ? <div className={styles.edit} style={{ display: show ? '' : 'none' }}><SubmitBtn color='red' borderRadius='100%' onClick={onDeleteClick}><DeleteIcon /></SubmitBtn> <SubmitBtn color='yellow' borderRadius='100%' onClick={() => { setEditOpen(true) }} ><EditIcon /></SubmitBtn></div> : ''}
                {editOpen ? <EditDevlogDialog open={editOpen} setOpen={setEditOpen} devlog={props.devlog} /> : ''}
            </div>
        </Grid>
    );
}

export default RenderedDevlogCard;
