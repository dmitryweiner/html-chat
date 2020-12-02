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
            initDone: false
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

    render() {
        const { user, initDone } = this.state;

        if (!initDone) {
            return <>Loading...</>;
        }

        return (
            <>
                {user ? (
                    <>
                        <Link to="/profile">Профиль {user.nickname}</Link>&nbsp;
                        <Link to="/chatSearch">Поиск чатов</Link>&nbsp;
                        <Link to="/userSearch">Поиск пользователей</Link>&nbsp;
                        <button onClick={() => this.logoutHandler()}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Логин</Link>&nbsp;
                        <Link to="/registration">Регистрация</Link>&nbsp;
                    </>
                )}
                <Switch>
                    <Route
                        path="/login"
                        render={routeProps => (
                            <ViewHeader
                                menuHandler={() => {}}
                                logoutHandler={() => this.logoutHandler()}
                                title="Логин"
                                user={user}
                            >
                                <LoginView
                                    updateAuthHandler={this.updateAuthState}
                                    {...routeProps}
                                />
                            </ViewHeader>
                        )}
                    />
                    <Route
                        path="/registration"
                        render={routeProps => (
                            <ViewHeader
                                menuHandler={() => {}}
                                logoutHandler={() => this.logoutHandler()}
                                title="Регистрация"
                                user={user}
                            >
                                <RegistrationView {...routeProps} />
                            </ViewHeader>
                        )}
                    />
                    <PrivateRoute path="/chat/:id" user={user}>
                        <ViewHeader
                            menuHandler={() => {}}
                            logoutHandler={() => this.logoutHandler()}
                            title="Чат"
                            user={user}
                        >
                            <ChatView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/profile" user={user}>
                        <ViewHeader
                            menuHandler={() => {}}
                            logoutHandler={() => this.logoutHandler()}
                            title="Профиль"
                            user={user}
                        >
                            <ProfileView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/chatSearch" user={user}>
                        <ViewHeader
                            menuHandler={() => {}}
                            logoutHandler={() => this.logoutHandler()}
                            title="Поиск чатов"
                            user={user}
                        >
                            <ChatSearchView />
                        </ViewHeader>
                    </PrivateRoute>
                    <PrivateRoute path="/userSearch" user={user}>
                        <ViewHeader
                            menuHandler={() => {}}
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
