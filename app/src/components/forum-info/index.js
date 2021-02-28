import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import ForumIcon from '../forum-icon';
import EpicProgrammer from '../epic-programmer';
import PageDiv from '../page-div';
import SubmitBtn from '../submit-btn';
import { useContext, useMemo, useState } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import UserContext from '../../contexts/UserContext';
import HeaderLink from '../header-link';
import ALink from '../link';
import EditForumDialog from '../edit-forum-dialog';
import { useHistory } from 'react-router-dom';
import AddModDialog from '../add-mod-dialog';

const ForumInfo = props => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);

    const date = new Date(Date.parse(`${props.forum.createdDate}`));

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);
    const [openAddMod, setOpenAddMod] = useState(false);

    const checkIfUserIsMod = () => {
        for (const mod of props.moderators)
            if (mod.moderator.userId === userContext.user._id) return true;

        return false;
    }

    const checkIfUserIsMember = () => {
        if (!userContext.user.loggedIn) return false;

        for (const member of props.members) {
            if (member.member.userId === userContext.user._id) return true;
        }

        return false;
    }

    const renderModerators = useMemo(() => {
        return props.moderators.map((mod, index) => {
            return (
                <Grid key={mod.user._id} index={index} item><HeaderLink to={`/u/${mod.user.username}`}>@{mod.user.username}</HeaderLink> {mod.user._id === props.forum.ownerId ? '(Owner)' : ''}</Grid>
            );
        });
    }, [props.moderators]);

    const join = async e => {
        const body = {
            forumId: props.forum._id,
            userId: userContext.user._id
        };

        const promise = await fetch(`${configContext.restApiUrl}/forum/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    const leave = async e => {
        const body = {
            forumId: props.forum._id,
            userId: userContext.user._id
        };

        const promise = await fetch(`${configContext.restApiUrl}/forum/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const response = await promise.json();

        if (!response.status) history.push('/505');
    }

    return (
        <div>
            <div className={styles.card}>
                <div style={{ textAlign: 'center' }}>
                    <Grid container justify='center' alignItems='center' spacing={2}>
                        <Grid item>
                            <ForumIcon iconUrl={props.forum.iconUrl} size={8} />
                        </Grid>
                        <Grid item>
                            <h2>{props.forum.title}</h2>
                        </Grid>
                    </Grid>
                    <HeaderLink to={`/forum/f/${props.forum.name}`}><i>/f/{props.forum.name}</i></HeaderLink>
                    <p><EpicProgrammer><b>Created:</b></EpicProgrammer> {date.toLocaleDateString()}</p>
                    {userContext.user.loggedIn ?
                        <h2>
                            {checkIfUserIsMember() ? <SubmitBtn color='red' padding='2% 6%' fontSize='1.5rem' onClick={leave}>Leave</SubmitBtn> : <SubmitBtn color='green' padding='2% 6%' fontSize='1.5rem' onClick={join}>Join</SubmitBtn>}
                        </h2> : ''}
                    <hr />
                    <h2><EpicProgrammer>About:</EpicProgrammer></h2>
                </div>
                <div styles={styles.desc}>
                    {props.forum.description}
                </div>
                {userContext.user.loggedIn && (userContext.user._id === props.forum.ownerId || checkIfUserIsMod()) ?
                    <div style={{ textAlign: 'right' }}>
                        <SubmitBtn color='yellow' onClick={() => { setEditOpen(true) }}>Edit</SubmitBtn>
                        {editOpen ? <EditForumDialog open={editOpen} setOpen={setEditOpen} forum={props.forum} /> : ''}
                    </div>
                    : ''}
            </div>
            {props.showMods ? <div style={{ marginTop: '5%' }} className={styles.card}>
                <div style={{ textAlign: 'center' }}><h2><EpicProgrammer>Moderators</EpicProgrammer></h2></div>
                <Grid container direction='column'>
                    {renderModerators}
                </Grid>
                {userContext.user.loggedIn && (userContext.user._id === props.forum.ownerId || checkIfUserIsMod()) ? <div style={{ textAlign: 'right' }}><SubmitBtn color='purple' onClick={() => { setOpenAddMod(true) }}>Add Moderator</SubmitBtn></div> : ''}
                {userContext.user.loggedIn && (userContext.user._id === props.forum.ownerId || checkIfUserIsMod()) && openAddMod ? <AddModDialog open={openAddMod} setOpen={setOpenAddMod} mods={props.moderators} forum={props.forum} /> : ''}
            </div> : ''}
        </div>
    );
}

export default ForumInfo;
