import React from 'react';
import MessageForm from '../components/MessageForm';
import MessagesList from '../components/MessagesList';
import apiService from '../apiService';

class ChatView extends React.Component {
    constructor() {
        super();
        // эти переменные будут меняться динамически
        this.state = {
            messages: []
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
            .then(() => apiService.message.getMessages(this.props.match.params.id))
            .then(response => response.data)
            .then(messages => this.setState({ messages }));
    }

    getMessages() {
        apiService.message
            .getMessages(this.props.match.params.id)
            .then(response => response.data)
            .then(messages => this.setState({ messages }));
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
