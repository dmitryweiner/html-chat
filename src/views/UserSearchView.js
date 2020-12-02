import React, { Component } from 'react';
import apiService from '@/apiService';
import UserList from '@/components/UserList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class UserSearchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            error: '',
            foundUsers: []
        };
    }

    validate() {
        this.setState({
            error: ''
        });
        if (this.state.nickname.length === 0) {
            this.setState({
                error: 'Введите ник пользователя'
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            // поиск пользователей
            apiService.user
                .find(this.state.nickname)
                .then(response => response.data)
                .then(foundUsers => this.setState({ foundUsers, nickname: '' }))
                .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
        }
    }

    handleStartDialogue(userId) {
        const redirectToChat = chatId => {
            this.props.history.push(`/chat/${chatId}`);
        };

        apiService.chat
            .create({
                isDialogue: true,
                participants: [userId]
            })
            .then(response => response.data)
            .then(chat => redirectToChat(chat.id))
            .catch(error => {
                if (error.response.status === 303) {
                    return error.response.data;
                }
            })
            .then(chat => (chat ? redirectToChat(chat.id) : null));
    }

    render() {
        const { nickname, error, foundUsers } = this.state;

        return (
            <>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="chat-title"
                                label="Ник"
                                value={nickname}
                                onChange={event => this.setState({ nickname: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" type="submit">
                                Искать
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <UserList list={foundUsers} handleClick={id => this.handleStartDialogue(id)} />
            </>
        );
    }
}
