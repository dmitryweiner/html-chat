import React from 'react';
import MessageForm from '@/components/MessageForm';
import MessagesList from '@/components/MessagesList';
import apiService from '@/apiService';

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
        this.setState({ users: [], messages: [] });
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

    async getMessages() {
        function getMessageIds(messages) {
            return messages.map(message => message.id);
        }

        function getOnlyNewMessages(serverMessages, stateMessages) {
            const serverIds = getMessageIds(serverMessages);
            const stateIds = getMessageIds(stateMessages);
            const newIds = serverIds.filter(id => !stateIds.includes(id));
            return serverMessages.filter(message => newIds.includes(message.id));
        }

        const response = await apiService.message.getMessages(this.props.match.params.id);
        const serverMessages = response.data;
        let newMessages = getOnlyNewMessages(serverMessages, this.state.messages);
        await this.getUsers(newMessages);
        newMessages = newMessages.map(message => {
            const user = this.state.users.find(user => user.id === message.userId);
            message.nickname = user.nickname;
            return message;
        });
        this.setState({ messages: [...this.state.messages, ...newMessages] });
    }

    async getUsers(newMessages) {
        const oldUsers = this.state.users;
        const oldUsersIds = oldUsers.map(user => user.id);
        const newUsersIds = [...new Set(newMessages.map(message => message.userId))];
        const toLoad = newUsersIds.filter(id => !oldUsersIds.includes(id));

        if (!toLoad.length) return;

        const newUsers = [];
        for (let id of toLoad) {
            const response = await apiService.user.getById(id);
            newUsers.push(response.data);
        }
        this.setState({ users: [...oldUsers, ...newUsers] });
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="chat-view">
                <MessageForm postMessage={data => this.postMessage(data)} />
                <MessagesList messages={messages} />
            </div>
        );
    }
}

export default ChatView;
