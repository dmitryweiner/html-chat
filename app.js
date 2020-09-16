const URL = 'http://localhost:3000';
class App {

    constructor() {
        // сохраним в объекте найденные элементы DOM
        this.button = document.getElementById('button');
        this.nick = document.getElementById('nick');
        this.message = document.getElementById('message');
        this.messages = document.getElementById('messages');
        this.serverMessages = [];

        // bind текущего this в функциях
        this.postMessage = this.postMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.drawMessages = this.drawMessages.bind(this);

        // получение новых сообщений в цикле
        setInterval(this.getMessages, 1000);

        // отправка сообщения при нажатии на кнопку
        this.button.addEventListener('click', this.postMessage);
    }

    postMessage() {
        // метод отправки сообщения
        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(JSON.stringify({
            nick: this.nick.value,
            message: this.message.value
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
    };

    getMessages() {
        // метод получения сообщений
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                console.error('Ошибка!');
            } else {
                this.drawMessages(xhr.response);
            }
        };
    };

    drawMessages(response) {
        // метод отрисовки сообщений
        const newServerMessages = JSON.parse(response);
        const existingIds = this.serverMessages.map(message => message.id);
        for (let serverMessage of newServerMessages) {
            if (!existingIds.includes(serverMessage.id)) {
                this.messages.innerHTML += `<ul><b>${serverMessage.nick}:</b> ${serverMessage.message}</ul>`;
            }
        }
        this.serverMessages = newServerMessages;
    };

}
