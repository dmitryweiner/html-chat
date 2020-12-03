import React from 'react';
import { Formik } from 'formik';
import apiService from '@/apiService';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            error: null
        };
    }

    handleSubmit(values) {
        this.setState({
            result: null,
            error: null
        });

        apiService.user
            .create(values)
            .then(() => {
                this.setState({ result: 'Пользователь успешно зарегистрирован' });
                setTimeout(() => this.props.history.push('/login'), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
    }

    render() {
        const { error, result } = this.state;

        return (
            <div className="registration-view">
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
                                <Formik
                                    initialValues={{ nickname: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.nickname) {
                                            errors.nickname = 'Введите никнейм';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Введите пароль';
                                        }
                                        if (values.password.length < 7) {
                                            errors.password =
                                                'Длина пароля должна быть больше 6 символов';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={values => {
                                        this.handleSubmit(values);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    {error && (
                                                        <Alert severity="error">{error}</Alert>
                                                    )}
                                                    {result && (
                                                        <Alert severity="info">{result}</Alert>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        error={errors.nickname && touched.nickname}
                                                        helperText={errors.nickname}
                                                        fullWidth
                                                        name="nickname"
                                                        label="Никнейм"
                                                        value={values.nickname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        error={errors.password && touched.password}
                                                        helperText={errors.password}
                                                        fullWidth
                                                        type="password"
                                                        name="password"
                                                        label="Пароль"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        fullWidth
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Создать пользователя
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    )}
                                </Formik>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
