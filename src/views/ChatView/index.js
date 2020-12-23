import React from 'react';
import MessageForm from '@/components/MessageForm';
import MessagesList from '@/components/MessagesList';
import apiService from '@/apiService';
import styles from './styles.module.css';
import { getWsClient } from '@/wsService';

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        // эти переменные будут меняться динамически
        this.state = {
            messages: [],
            users: []
        };

        this.needScroll = true;
    }

    componentDidMount() {
        this.getMessages().then(() => this.scrollToBottom());
        this.wsClient = getWsClient(`/message/${this.props.match.params.id}`, incoming => {
            if (incoming.added) {
                this.receiveMessageWs(incoming.added);
            }
            if (incoming.deleted) {
                const newMessages = this.state.messages.filter(
                    message => message.id !== incoming.deleted
                );
                this.setState({ messages: newMessages });
            }
        });
    }

    componentWillUnmount() {
        this.wsClient.close();
    }

    postMessage({ content }) {
        this.wsClient.wsSend({ content, chatId: this.props.match.params.id });
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

        const serverMessages = await apiService.message.getMessages(this.props.match.params.id);
        let newMessages = getOnlyNewMessages(serverMessages, this.state.messages);
        await this.addNicknamesToMessages(newMessages);
    }

    async receiveMessageWs(newMessage) {
        await this.addNicknamesToMessages([newMessage]);
        this.needScroll = true;
        this.scrollToBottom();
    }

    async addNicknamesToMessages(newMessages) {
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
            const user = await apiService.user.getById(id);
            newUsers.push(user);
        }
        this.setState({ users: [...oldUsers, ...newUsers] });
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
        this.needScroll = false;
    }

    render() {
        const { messages } = this.state;
        return (
            <div className={styles.chatView}>
                <div className={styles.messages}>
                    <MessagesList messages={messages} />
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                    />
                </div>
                <div className={styles.form}>
                    <MessageForm postMessage={data => this.postMessage(data)} />
                </div>
            </div>
        );
    }
}

export default ChatView;
