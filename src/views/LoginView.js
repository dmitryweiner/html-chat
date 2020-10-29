import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            result: null,
            error: null
        };
    }

    handleSubmit(e) {
        this.setState({
            result: null,
            error: null
        });
        axiosInstance
            .post('/auth', {
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ result: 'Пользователь успешно залогинился' });
                setTimeout(() => this.props.history.push('/profile'), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка' + error.response.data.error }));
        e.preventDefault();
    }

    render() {
        return (
            <>
                <h1>Логин</h1>
                {this.state.error}
                {this.state.result}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Никнейм:&nbsp;
                            <input
                                type="text"
                                value={this.state.nickname}
                                onChange={e => this.setState({ nickname: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Пароль:&nbsp;
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit">Войти</button>
                </form>
            </>
        );
    }
}
