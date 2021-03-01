import styles from './index.module.css';
import EpicProgrammer from '../epic-programmer';
import ALink from '../link';
import { useRef, useEffect, useContext, useMemo, useState } from 'react';
import SubmitBtn from '../submit-btn';
import { Grid } from '@material-ui/core';
import UserContext from '../../contexts/UserContext';
import HeaderLink from '../header-link';
import EditProjectDialog from '../edit-project-dialog';
import AddMemberDialog from '../add-member-dialog';

const ProjectInfo = props => {
    const userContext = useContext(UserContext);

    const desc = useRef(null);

    const [editOpen, setEditOpen] = useState(false);
    const [addMemberOpen, setAddMemberOpen] = useState(false);

    useEffect(() => {
        desc.current.innerHTML = props.project.description;
    }, [props]);

    const checkIfUserIsMember = () => {
        if (!userContext.user || !userContext.user.loggedIn) return false;

        for (const member of props.members) {
            if (member._id === props.project.ownerId) return true;
        }

        return false;
    }

    const renderMembers = useMemo(() => {
        return props.members.map((member, index) => {
            return (
                <Grid key={member._id} index={index} item><HeaderLink to={`/u/${member.username}`}>@{member.username}</HeaderLink> {member._id === props.project.ownerId ? '(Owner)' : ''}</Grid>
            );
        });
    }, [props.members]);

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.centered}>
                    <h2>{props.project.name}</h2>
                    <p><b><EpicProgrammer>GitHub:</EpicProgrammer></b> {props.project.gitHubUrl ? <ALink to={props.project.gitHubUrl}>{props.project.gitHubUrl}</ALink> : 'Unspecified'}</p>
                    <p><b><EpicProgrammer>DevLogs:</EpicProgrammer></b> {props.devLogs}</p>
                    <p><b><EpicProgrammer>Members:</EpicProgrammer></b> {props.members.length}</p>
                </div>
                <hr />
                <h2 className={styles.centered}><EpicProgrammer>Description:</EpicProgrammer></h2>
                <div styles={styles.desc} ref={desc}>
                </div>
                {checkIfUserIsMember() ? <div className={styles.btns}><SubmitBtn onClick={() => { setEditOpen(true) }} color='yellow'>Edit</SubmitBtn></div> : ''}
                {checkIfUserIsMember() && editOpen ? <EditProjectDialog open={editOpen} setOpen={setEditOpen} project={props.project} /> : ''}
            </div>
            <div className={`${styles.card} ${styles.members}`}>
                <h2 className={styles.centered}><EpicProgrammer>Members:</EpicProgrammer></h2>
                <Grid container direction='column'>
                    {renderMembers}
                </Grid>
                {checkIfUserIsMember() ? <div className={styles.btns}><SubmitBtn onClick={() => { setAddMemberOpen(true) }}>Add a Member</SubmitBtn></div> : ''}
                {checkIfUserIsMember() ? <AddMemberDialog open={addMemberOpen} setOpen={setAddMemberOpen} projectId={props.project._id} /> : ''}
            </div>

            {checkIfUserIsMember() ? '' : <div className={styles.follow}><SubmitBtn color='green'>Follow / Unfollow</SubmitBtn></div>}
        </div>
    );
}

export default ProjectInfo;
