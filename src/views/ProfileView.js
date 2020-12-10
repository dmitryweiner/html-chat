import React from 'react';
import apiService from '@/apiService';
import ChatForm from '@/components/ChatForm';
import ChatList from '@/components/ChatList';
import Typography from '@material-ui/core/Typography';
import { Box, Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    componentDidMount() {
        this.getChatList();
    }

    handleChatCreate(params) {
        apiService.chat.create(params).then(() => this.getChatList());
    }

    getChatList() {
        apiService.chat.getMyChats(this.props.user.id).then(chats => this.setState({ chats }));
    }

    goHandler(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandler(id) {
        if (!confirm('Вы действительно хотите вступить в этот чат?')) return;

        apiService.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Вы действительно хотите удалить этот чат?')) return;

        apiService.chat.delete(id).then(() => this.getChatList());
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {user.nickname}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Создан: {new Date(user.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Редактировать</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={3} mx="auto">
                    <Typography variant="h6" align="center">
                        Мои чаты
                    </Typography>
                </Box>
                <ChatList
                    userId={user.id}
                    list={this.state.chats}
                    goHandler={id => this.goHandler(id)}
                    joinHandler={id => this.joinHandler(id)}
                    deleteHandler={id => this.deleteHandler(id)}
                />
                <ChatForm handleSubmit={data => this.handleChatCreate(data)} />
            </>
        );
    }
}
