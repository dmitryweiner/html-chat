import React from 'react';
import Form from '../components/Form';
import MessagesList from '../components/MessagesList';

const URL = 'http://localhost:3000';

class ChatView extends React.Component {
    constructor() {
        super();
        // эти переменные будут меняться динамически
        this.state = {
            serverMessages: []
        };

        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(this.getMessages.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    postMessage(newMessage) {
        // метод отправки сообщения
        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(
            JSON.stringify({
                nick: newMessage.nick,
                message: newMessage.message
            })
        );

        xhr.onload = () => this.handleOnload(xhr);

        xhr.onerror = function () {
            console.log('Запрос не удался');
        };
    }

    getMessages() {
        // метод получения сообщений
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = () => this.handleOnload(xhr);
    }

    handleOnload(xhr) {
        if (xhr.status !== 200) {
            console.error('Ошибка!');
        } else {
            this.drawMessages(xhr.response);
        }
    }

    drawMessages(response) {
        // метод отрисовки сообщений
        const newServerMessages = JSON.parse(response);
        this.setState({ serverMessages: newServerMessages });
    }

    render() {
        const { serverMessages } = this.state;
        return (
            <>
                <h1>Чат</h1>
                <Form postMessage={newMessage => this.postMessage(newMessage)} />
                <MessagesList messages={serverMessages} />
            </>
        );
    }
}

export default ChatView;
