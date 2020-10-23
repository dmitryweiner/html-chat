import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';

class App extends React.Component {
    render() {
        return (
            <>
                <Link to="/login">Логин</Link>&nbsp;
                <Link to="/registration">Регистрация</Link>&nbsp;
                <Link to="/chat">Чат</Link>
                <Switch>
                    <Route path="/login" component={LoginView} />
                    <Route path="/registration" component={RegistrationView} />
                    <Route path="/chat" component={ChatView} />
                    <Redirect exact from="/" to="/login" />
                </Switch>
            </>
        );
    }
}

export default App;
