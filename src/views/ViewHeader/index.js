import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { AppBar, Menu, MenuItem, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AccountCircle } from '@material-ui/icons';
import Container from '@material-ui/core/Container';

export default class ViewHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            anchorEl: null
        };
    }

    handleMenu(event, isOpen) {
        if (isOpen) {
            this.setState({
                anchorEl: event.currentTarget,
                menuOpen: true
            });
        } else {
            this.setState({
                anchorEl: null,
                menuOpen: false
            });
        }
    }

    render() {
        const { user, logoutHandler, menuHandler, title, children, history } = this.props;
        const { menuOpen, anchorEl } = this.state;
        return (
            <>
                <div className={styles.root}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={styles.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={menuHandler}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={styles.title}>
                                {title}
                            </Typography>
                            {user ? (
                                <>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={e => this.handleMenu(e, true)}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        open={menuOpen}
                                        onClose={e => this.handleMenu(e, false)}
                                    >
                                        <MenuItem onClick={() => history.push('/profile')}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button color="inherit" onClick={() => history.push('/login')}>
                                    Login
                                </Button>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={styles.children}>
                    <Container maxWidth="md">{React.cloneElement(children, this.props)}</Container>
                </div>
            </>
        );
    }
}

ViewHeader.propTypes = {
    menuHandler: PropTypes.func.isRequired,
    logoutHandler: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired
    })
};
