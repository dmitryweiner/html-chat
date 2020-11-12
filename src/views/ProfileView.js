import React from 'react';
import apiService from '../apiService';
import ChatForm from '../components/ChatForm';
import ChatList from '../components/ChatList';
import SearchChatForm from '../components/SearchChatForm';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            chats: [],
            foundChats: []
        };
    }

    componentDidMount() {
        apiService.user
            .getCurrent()
            .then(response => response.data)
            .then(user => this.setState({ user }))
            .then(() => apiService.chat.getMyChats(this.state.user.id))
            .then(response => response.data)
            .then(chats => this.setState({ chats }));
    }

    handleChatCreate({ title }) {
        apiService.chat.create({ title }).then(() => this.getChatList());
    }

    getChatList() {
        apiService.chat
            .getMyChats(this.state.user.id)
            .then(response => response.data)
            .then(chats => this.setState({ chats }));
    }

    goHandle(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandle(id) {
        if (!confirm('Вы действительно хотите вступить в этот чат?')) return;

        apiService.chat.join(id).then(() => this.getChatList());
    }

    deleteHandle(id) {
        if (!confirm('Вы действительно хотите удалить этот чат?')) return;

        apiService.chat.delete(id).then(() => this.getChatList());
    }

    handleChatSearch({ title }) {
        apiService.chat
            .search(title)
            .then(response => response.data)
            .then(foundChats => this.setState({ foundChats }));
    }

    render() {
        return (
            <>
                <h1>Профиль пользователя</h1>
                {this.state.user && (
                    <>
                        <div>Никнейм: {this.state.user.nickname}</div>
                        <div>Создан: {new Date(this.state.user.createdAt).toLocaleString()}</div>
                    </>
                )}

                <h3>Мои чаты</h3>
                <ChatList
                    userId={this.state.user?.id}
                    list={this.state.chats}
                    goHandle={id => this.goHandle(id)}
                    joinHandle={id => this.joinHandle(id)}
                    deleteHandle={id => this.deleteHandle(id)}
                />
                <ChatForm handleSubmit={data => this.handleChatCreate(data)} />

                <SearchChatForm handleSubmit={data => this.handleChatSearch(data)} />
                <ChatList
                    userId={this.state.user?.id}
                    list={this.state.foundChats}
                    goHandle={id => this.goHandle(id)}
                    joinHandle={id => this.joinHandle(id)}
                    deleteHandle={id => this.deleteHandle(id)}
                />
            </>
        );
    }
}
