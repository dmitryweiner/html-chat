const URL = 'http://localhost:3000';

class Message extends React.Component {
    render() {
        const { nick, message } = this.props;
        return <li>
            <b>{nick}:</b>
            {message}
        </li>;
    }
}

class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;
        return <ul>
            {messages.map((message, index) => (
                <Message nick={message.nick} message={message.message} key={index}/>
            ))}
        </ul>;
    }
}

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            nick: '',
            message: ''
        };
    }

    handleSend() {
        this.props.postMessage({
            nick: this.state.nick,
            message: this.state.message
        });
    }

    render() {
        const { nick, message } = this.state;

        return <form>
                <input
                    value={nick}
                    type="text"
                    onChange={e => this.setState({nick: e.target.value})}
                />
                <br/>
                <textarea
                    value={message}
                    onChange={e => this.setState({message: e.target.value})}
                >
                </textarea>
                <br/>
                <input
                    type="button"
                    value="отправить"
                    onClick={() => this.handleSend()}
                />
            </form>;
    }
}

class App extends React.Component {

    constructor() {
        super();
        // эти переменные будут меняться динамически
        this.state = {
            serverMessages: []
        };

        // получение новых сообщений в цикле
        //я делаю bind, чтобы у функции был определён контекст this
        setInterval(this.getMessages.bind(this), 1000);
    }

    postMessage(newMessage) {
        // метод отправки сообщения
        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(JSON.stringify({
            nick: newMessage.nick,
            message: newMessage.message
        }));

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error('Ошибка!');
            } else {
                this.drawMessages(xhr.response);
            }
        };

        xhr.onerror = function() {
            console.log('Запрос не удался');
        };
    }

    getMessages() {
        // метод получения сообщений
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error('Ошибка!');
            } else {
                this.drawMessages(xhr.response);
            }
        };
    }

    drawMessages(response) {
        // метод отрисовки сообщений
        const newServerMessages = JSON.parse(response);
        this.setState({serverMessages: newServerMessages});
    }

    render() {
        const {serverMessages } = this.state;
        return <>
            <h1>Чат</h1>
            <Form postMessage={(newMessage) => this.postMessage(newMessage)}/>
            <MessagesList messages={serverMessages}/>
        </>
    }

}
