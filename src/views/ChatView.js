import React from 'react';
import MessageForm from '../components/MessageForm';
import MessagesList from '../components/MessagesList';
import apiService from '../apiService';

class ChatView extends React.Component {
    constructor() {
        super();
        // эти переменные будут меняться динамически
        this.state = {
            messages: [],
            users: []
        };

        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(this.getMessages.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    postMessage({ content }) {
        apiService.message
            .create({ content, chatId: this.props.match.params.id })
            .then(() => this.getMessages());
    }

    getMessages() {
        return apiService.message
            .getMessages(this.props.match.params.id)
            .then(response => response.data)
            .then(messages => this.setState({ messages }))
            .then(() => this.loadParticipants())
            .then(() => {
                const newMessages = this.state.messages.map(message => {
                    const user = this.state.users.find(user => user.id === message.userId);
                    message.nickname = user.nickname;
                    return message;
                });
                this.setState({ messages: newMessages });
            });
    }

    loadParticipants() {
        const messages = this.state.messages;
        const userIds = [...new Set(messages.map(message => message.userId))];
        const oldUsers = this.state.users;
        const oldUserIds = oldUsers.map(user => user.id);
        const toLoad = userIds.filter(id => !oldUserIds.includes(id));
        if (toLoad.length) {
            return Promise.all(toLoad.map(id => apiService.user.getById(id)))
                .then(responses => responses.map(response => response.data))
                .then(loadedUsers => this.setState({ users: [...oldUsers, ...loadedUsers] }));
        }
    }

    render() {
        const { messages } = this.state;
        return (
            <>
                <h1>Чат</h1>
                <MessageForm postMessage={newMessage => this.postMessage(newMessage)} />
                <MessagesList messages={messages} />
            </>
        );
    }
}

export default ChatView;
