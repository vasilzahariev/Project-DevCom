import styles from './index.module.css';
import { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

const ForumDislikeBtn = props => {
    const userContext = useContext(UserContext);

    const history = useHistory();

    useEffect(() => { }, [props.dislikes]);

    const checkIfUserHasDisliked = () => {
        if (!userContext.user.loggedIn) return false;

        for (const dislike of props.dislikes) {
            if (dislike === userContext.user._id)
                return true;
        }

        return false;
    }

    const dislike = async e => {
        if (!userContext.user.loggedIn) {
            history.push('/auth/login');

            return;
        }

        const body = {
            hasDisliked: checkIfUserHasDisliked(),
            userId: userContext.user._id
        }

        const promise = await fetch(props.fetchUrl, {
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
        <button title={checkIfUserHasDisliked() ? 'Undislike' : 'Dislike'} className={`${styles.btn} ${checkIfUserHasDisliked() ? styles.disliked : styles.dislike}`} onClick={dislike}>{checkIfUserHasDisliked() ? <ThumbDownIcon style={props.fontSize ? { fontSize: props.fontSize } : {}} /> : <ThumbDownAltOutlinedIcon style={props.fontSize ? { fontSize: props.fontSize } : {}} />}</button>
    );
}

export default ForumDislikeBtn;
