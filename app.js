const URL = 'http://localhost:3000';
class App extends React.Component {

    constructor() {
        super();
        // эти переменные будут меняться динамически
        this.state = {
            nick: '',
            message: '',
            serverMessages: []
        };

        // получение новых сообщений в цикле
        //я делаю bind, чтобы у функции был определён контекст this
        setInterval(this.getMessages.bind(this), 1000);
    }

    postMessage() {
        // метод отправки сообщения
        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(JSON.stringify({
            nick: this.state.nick,
            message: this.state.message
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
        return <>
            <h1>Чат</h1>
            <form>
                <input
                    value={this.state.nick}
                    type="text"
                    onChange={e => this.setState({nick: e.target.value})}
                />
                <br/>
                <textarea
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                >
                </textarea>
                <br/>
                <input
                    type="button"
                    value="отправить"
                    onClick={() => this.postMessage()}
                />
            </form>
            <ul>
                {this.state.serverMessages.map((message, index) => (
                    <li key={index}>
                        <b>{message.nick}:</b>
                        {message.message}
                    </li>
                ))}
            </ul>
        </>
    }

}
