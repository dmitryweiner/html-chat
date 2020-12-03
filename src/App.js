import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import apiService from './apiService';
import ChatSearchView from '@/views/ChatSearchView';
import UserSearchView from '@/views/UserSearchView';
import ViewHeader from '@/views/ViewHeader';
import { Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import { AccountCircle, GroupAdd, MeetingRoom, PersonAdd, Search } from '@material-ui/icons';

class PrivateRoute extends React.Component {
    render() {
        const { user, children, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={routeProps =>
                    user ? (
                        React.cloneElement(children, { ...routeProps, user })
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            initDone: false,
            isDrawerOpen: false
        };
        this.updateAuthState = this.updateAuthState.bind(this);
    }

    componentDidMount() {
        this.updateAuthState();
    }

    updateAuthState() {
        return apiService.user
            .getCurrent()
            .then(response => response.data)
            .then(user => this.setState({ user, initDone: true }))
            .catch(() => this.setState({ user: null, initDone: true }));
    }

    logoutHandler() {
        apiService.auth.logout().then(() => {
            this.setState({ user: null });
        });
    }

    drawerHandler(isDrawerOpen) {
        this.setState({ isDrawerOpen });
    }

    render() {
        const { user, initDone, isDrawerOpen } = this.state;

        if (!initDone) {
            return <>Loading...</>;
        }

        return (
            <>
                <Drawer anchor="left" open={isDrawerOpen} onClose={() => this.drawerHandler(false)}>
                    <div
                        role="presentation"
                        onClick={() => this.drawerHandler(false)}
                        onKeyDown={() => this.drawerHandler(false)}
                    >
                        <List>
                            {user ? (
                                <>
                                    <ListItem button component={Link} to="/profile">
                                        <ListItemIcon>
                                            <AccountCircle />
                                        </ListItemIcon>
                                        <ListItemText primary="Профиль" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/chatSearch">
                                        <ListItemIcon>
                                            <Search />
                                        </ListItemIcon>
                                        <ListItemText primary="Поиск чатов" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/userSearch">
                                        <ListItemIcon>
                                            <GroupAdd />
                                        </ListItemIcon>
                                        <ListItemText primary="Поиск пользователей" />
                                    </ListItem>
                                    <ListItem button onClick={() => this.logoutHandler()}>
                                        <ListItemIcon>
                                            <MeetingRoom />
                                        </ListItemIcon>
                                        <ListItemText primary="Выход" />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem button component={Link} to="/login">
                                        <ListItemIcon>
                                            <AccountCircle />
                                        </ListItemIcon>
                                        <ListItemText primary="Логин" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/registration">
                                        <ListItemIcon>
                                            <PersonAdd />
                                        </ListItemIcon>
                                        <ListItemText primary="Регистрация" />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </div>
                </Drawer>
                <Switch>
                    <Route
                        path="/login"
                        render={routeProps => (
                            <ViewHeader
                                menuHandler={() => this.drawerHandler(true)}
                                logoutHandler={() => this.logoutHandler()}
                                title="Логин"
                                user={user}
                                {...routeProps}
                            >
                                <LoginView updateAuthHandler={this.updateAuthState} />
                            </ViewHeader>
                        )}
                    />
                    <Route
                        path="/registration"
                        render={routeProps => (
                            <ViewHeader
                                menuHandler={() => this.drawerHandler(true)}
                                logoutHandler={() => this.logoutHandler()}
                                title="Регистрация"
                                user={user}
                                {...routeProps}
                            >
                                <RegistrationView />
                            </ViewHeader>
                        )}
                    />
                    <PrivateRoute path="/chat/:id" user={user}>
                        <ViewHeader
                            menuHandler={() => this.drawerHandler(true)}
                            logoutHandler={() => this.logoutHandler()}
                            title="Чат"
                            user={user}
                        >
                            <ChatView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/profile" user={user}>
                        <ViewHeader
                            menuHandler={() => this.drawerHandler(true)}
                            logoutHandler={() => this.logoutHandler()}
                            title="Профиль"
                            user={user}
                        >
                            <ProfileView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/chatSearch" user={user}>
                        <ViewHeader
                            menuHandler={() => this.drawerHandler(true)}
                            logoutHandler={() => this.logoutHandler()}
                            title="Поиск чатов"
                            user={user}
                        >
                            <ChatSearchView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/userSearch" user={user}>
                        <ViewHeader
                            menuHandler={() => this.drawerHandler(true)}
                            logoutHandler={() => this.logoutHandler()}
                            title="Поиск пользователей"
                            user={user}
                        >
                            <UserSearchView />
                        </ViewHeader>
                    </PrivateRoute>
                    <Redirect exact from="/" to="/profile" />
                </Switch>
            </>
        );
    }
}

export default App;
