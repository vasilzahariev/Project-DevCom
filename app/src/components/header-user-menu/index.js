import styles from './index.module.css';
import { Popper, Grow, Paper, ClickAwayListener, MenuList } from '@material-ui/core';

const HeaderUserMenu = (props) => {
    return (
        <Popper open={props.open} anchorEl={props.anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={props.handleClose}>
                            <MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
                                {props.children}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default HeaderUserMenu;
