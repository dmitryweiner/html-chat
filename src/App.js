import React, { Suspense } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
const LoginView = React.lazy(() => import(/* webpackPreload: true */ './views/LoginView'));
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
const ProfileView = React.lazy(() => import(/* webpackPreload: true */ './views/ProfileView'));
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
                        React.cloneElement(children, { ...routeProps })
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

const Loader = () => <>Loading</>;

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
            return <Loader />;
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
                            <Suspense fallback={<Loader />}>
                                <LoginView
                                    updateAuthHandler={this.updateAuthState}
                                    {...routeProps}
                                />
                            </Suspense>
                        )}
                    />
                    <Route path="/registration" component={RegistrationView} />
                    <PrivateRoute path="/chat/:id" user={user} component={ChatView} />
                    <PrivateRoute path="/profile" user={user}>
                        <Suspense fallback={<Loader />}>
                            <ProfileView user={user} />
                        </Suspense>
                    </PrivateRoute>
                    <PrivateRoute
                        path="/chatSearch"
                        user={user}
                        component={ChatSearchView}
                        componentProps={{ user }}
                    />
                    <PrivateRoute
                        path="/userSearch"
                        user={user}
                        component={UserSearchView}
                        componentProps={{ user }}
                    />
                    <Redirect exact from="/" to="/profile" />
                </Switch>
            </Container>
        );
    }
}

export default App;
