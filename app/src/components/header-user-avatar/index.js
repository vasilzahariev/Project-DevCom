import { useState, useRef, useEffect, useContext } from 'react';
import styles from './index.module.css';
import { Button, Avatar, makeStyles } from '@material-ui/core';
import HeaderUserMenu from '../header-user-menu';
import UserContext from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5)
    }
}));

const HeaderUserAvatar = (props) => {
    const userContext = useContext(UserContext);

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <Avatar src={userContext.user.profilePictureUrl}></Avatar>
            </Button>
            <HeaderUserMenu open={open} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown}>
                {props.children}
            </HeaderUserMenu>
        </div>
    );
}

export default HeaderUserAvatar;
