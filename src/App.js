import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import apiService from './apiService';
import ChatSearchView from '@/views/ChatSearchView';
import UserSearchView from '@/views/UserSearchView';
import Container from '@material-ui/core/Container';

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
            <Container maxWidth="md">
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
                            <LoginView updateAuthHandler={this.updateAuthState} {...routeProps} />
                        )}
                    />
                    <Route path="/registration" component={RegistrationView} />
                    <PrivateRoute path="/chat/:id" user={user}>
                        <ChatView />
                    </PrivateRoute>
                    <PrivateRoute path="/profile" user={user}>
                        <ProfileView />
                    </PrivateRoute>
                    <PrivateRoute path="/chatSearch" user={user}>
                        <ChatSearchView />
                    </PrivateRoute>
                    <PrivateRoute path="/userSearch" user={user}>
                        <UserSearchView />
                    </PrivateRoute>
                    <Redirect exact from="/" to="/profile" />
                </Switch>
            </Container>
        );
    }
}

export default App;
