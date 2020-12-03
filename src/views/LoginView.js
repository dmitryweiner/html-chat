import React from 'react';
import apiService from '@/apiService';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            result: null,
            error: null,
            formErrors: {
                nickname: null,
                password: null
            }
        };
    }

    validate() {
        const formErrors = {};
        let noErrors = true;
        if (this.state.nickname.length === 0) {
            formErrors.nickname = 'Введите никнейм';
            noErrors = false;
        }

        if (this.state.password.length === 0) {
            formErrors.password = 'Введите пароль';
            noErrors = false;
        }

        this.setState({ formErrors });
        return noErrors;
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            result: null,
            error: null
        });

        if (!this.validate()) {
            return;
        }

        apiService.auth
            .login({
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ result: 'Пользователь успешно залогинился' });
                setTimeout(() => this.redirectAfterLogin(), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
    }

    redirectAfterLogin() {
        const redirectUrl = this.props.location.state
            ? this.props.location.state.from.pathname
            : '/profile';
        this.props.updateAuthHandler().then(() => this.props.history.push(redirectUrl));
    }

    render() {
        const { error, result, nickname, password, formErrors } = this.state;

        return (
            <div className="login-view">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh', marginTop: '-60px' }}
                >
                    <Grid item lg={4} sm={12}>
                        <Card>
                            <CardContent>
                                <form onSubmit={e => this.handleSubmit(e)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            {error && <Alert severity="error">{error}</Alert>}
                                            {result && <Alert severity="info">{result}</Alert>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                error={formErrors.nickname}
                                                helperText={formErrors.nickname}
                                                fullWidth
                                                name="nickname"
                                                label="Никнейм"
                                                value={nickname}
                                                onChange={e =>
                                                    this.setState({ nickname: e.target.value })
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                error={formErrors.password}
                                                helperText={formErrors.password}
                                                fullWidth
                                                name="password"
                                                label="Пароль"
                                                type="password"
                                                value={password}
                                                onChange={e =>
                                                    this.setState({ password: e.target.value })
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Войти
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                Введите свои логин и пароль. Если вы ещё не
                                                зарегистрированы, то{' '}
                                                <Link to="/registration">зарегистрируйтесь</Link>.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
