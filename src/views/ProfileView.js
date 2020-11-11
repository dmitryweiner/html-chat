import React from 'react';
import apiService from '../apiService';
import ChatForm from '../components/ChatForm';
import ChatList from '../components/ChatList';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            chats: []
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

    handleCreateChat({ title }) {
        apiService.chat.create({ title }).then(() => {
            apiService.chat
                .getMyChats(this.state.user.id)
                .then(response => response.data)
                .then(chats => this.setState({ chats }));
        });
    }

    handleChatClick(id) {
        this.props.history.push(`/chat/${id}`);
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
                <ChatList list={this.state.chats} clickHandle={id => this.handleChatClick(id)} />
                <ChatForm handleSubmit={data => this.handleCreateChat(data)} />
            </>
        );
    }
}
