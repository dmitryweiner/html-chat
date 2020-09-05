document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('button');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    button.addEventListener('click', function() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000');
        xhr.send(JSON.stringify({
          nick: nick.value,
          message: message.value
        }));

        xhr.onload = function() {
            if (xhr.status != 200) {
                console.error('Ошибка!');
            } else {
                const serverMessages = JSON.parse(xhr.response);
                messages.innerHTML = '';
                for (let serverMessage of serverMessages) {
                    messages.innerHTML += `<ul><b>${serverMessage.nick}:</b> ${serverMessage.message}</ul>`;
                }
            }
        };

        xhr.onerror = function() {
            console.log('Запрос не удался');
        };
    });

});

