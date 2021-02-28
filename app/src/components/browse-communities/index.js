import styles from './index.module.css';
import DialogWindow from '../dialog-window';
import { useEffect, useContext, useState, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { CircularProgress, Grid } from '@material-ui/core';
import ForumIcon from '../forum-icon';
import HeaderLink from '../header-link';

const BrowseCommmunities = props => {
    const configContext = useContext(ConfigContext);

    const [ended, setEnded] = useState(false);
    const [forums, setForums] = useState();

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/forum/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            setForums(response);
            setEnded(true);
        });
    }, [forums]);

    const renderer = useMemo(() => {
        if (!ended) return;

        return forums.map((forum, index) => {
            return (
                <Grid key={forum._id} index={index} item>
                    <HeaderLink to={`/forum/f/${forum.name}`}>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item><ForumIcon iconUrl={forum.iconUrl} size={7} /></Grid>
                            <Grid item><p style={{ fontSize: '1.4rem' }}>{forum.title}</p></Grid>
                        </Grid>
                    </HeaderLink>
                </Grid>
            );
        });
    }, [forums]);

    const close = e => {
        props.setOpen(false);
    }

    return (
        <DialogWindow open={props.open} onClearClose={close} maxWidth='xs' title='Browse Communities'>
            <Grid container direction='column' justify="center" alignItems='flex-start' spacing={3}>
                {ended ? renderer : <CircularProgress color='inherit' />}
            </Grid>
        </DialogWindow>
    );
}

export default BrowseCommmunities;
