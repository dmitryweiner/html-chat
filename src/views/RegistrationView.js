import React from 'react';
import apiService from '../apiService';

export default class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            result: null,
            error: null
        };
    }

    validate() {
        if (this.state.nickname.length === 0) {
            this.setState({
                error: 'Введите никнейм'
            });
            return false;
        }

        if (this.state.password.length === 0) {
            this.setState({
                error: 'Введите пароль'
            });
            return false;
        }

        if (this.state.password.length < 7) {
            this.setState({
                error: 'Длина пароля должна быть больше 6 символов'
            });
            return false;
        }

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            result: null,
            error: null
        });

        if (!this.validate()) return;

        apiService.user
            .create({
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ result: 'Пользователь успешно зарегистрирован' });
                setTimeout(() => this.props.history.push('/login'), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
    }

    render() {
        const { error, result, nickname, password } = this.state;

        return (
            <>
                <h1>Регистрация</h1>
                <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
                {result}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Никнейм:&nbsp;
                            <input
                                type="text"
                                value={nickname}
                                onChange={e => this.setState({ nickname: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Пароль:&nbsp;
                            <input
                                type="password"
                                value={password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit">Создать пользователя</button>
                </form>
            </>
        );
    }
}
