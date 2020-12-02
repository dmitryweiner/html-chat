import React from 'react';
import apiService from '@/apiService';
import ChatForm from '@/components/ChatForm';
import ChatList from '@/components/ChatList';

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
        apiService.chat
            .getMyChats(this.props.user.id)
            .then(response => response.data)
            .then(chats => this.setState({ chats }));
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
                <div>Никнейм: {user.nickname}</div>
                <div>Создан: {new Date(user.createdAt).toLocaleString()}</div>

                <h3>Мои чаты</h3>
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
