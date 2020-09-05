document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('button');
    const input = document.getElementById('input');
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
                drawMessages(xhr.response);
            }
        };

        xhr.onerror = function() {
            console.log('Запрос не удался');
        };
    });

    setInterval(function() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status != 200) {
                console.error('Ошибка!');
            } else {
                drawMessages(xhr.response);
            }
        };
    }, 1000);

    function drawMessages(response) {
        const messages = document.getElementById('messages');
        const serverMessages = JSON.parse(response);
        messages.innerHTML = '';
        for (let serverMessage of serverMessages) {
            messages.innerHTML += `<ul><b>${serverMessage.nick}:</b> ${serverMessage.message}</ul>`;
        }
    }

});

