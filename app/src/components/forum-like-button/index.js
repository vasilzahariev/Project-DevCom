import styles from './index.module.css';
import { useEffect, useContext } from 'react';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const ForumLikeButton = props => {
    const userContext = useContext(UserContext);

    const history = useHistory();

    useEffect(() => { }, [props.likes]);

    const checkIfUserHasLiked = () => {
        if (!userContext.user.loggedIn) return false;

        for (const like of props.likes) {
            if (like === userContext.user._id)
                return true;
        }

        return false;
    }

    const like = async e => {
        if (!userContext.user.loggedIn) {
            history.push('/auth/login');

            return;
        }

        const body = {
            hasLiked: checkIfUserHasLiked(),
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

        if (!response.status) history.push('/500');
    }

    return (
        <button title={checkIfUserHasLiked() ? 'Unlike' : 'Like'} className={`${styles.btn} ${checkIfUserHasLiked() ? styles.liked : styles.like}`} onClick={like}>{checkIfUserHasLiked() ? <ThumbUpIcon style={props.fontSize ? { fontSize: props.fontSize } : {}} /> : <ThumbUpAltOutlinedIcon style={props.fontSize ? { fontSize: props.fontSize } : {}} />}</button>
    );
}

export default ForumLikeButton;
