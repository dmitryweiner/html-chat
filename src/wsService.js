import { isProduction } from '@/utils';
import { URL } from '@/apiService';
const PROTOCOL = isProduction() ? 'wss' : 'ws';

export function getWsClient(uri, onReceive) {
    const wsConnection = new WebSocket(`${PROTOCOL}://${URL}${uri}`);

    wsConnection.onopen = function () {
        console.log('Соединение установлено.');
    };

    wsConnection.onclose = function (event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    wsConnection.onerror = function (error) {
        console.log('Ошибка ' + error.message);
    };

    wsConnection.onmessage = e => {
        console.log('Message from server:', e.data);
        onReceive(JSON.parse(e.data));
    };

    wsConnection.wsSend = function wsSend(data) {
        const strData = JSON.stringify(data);
        // readyState - true, если есть подключение
        if (!wsConnection.readyState) {
            setTimeout(function () {
                wsSend(strData);
            }, 100);
        } else {
            wsConnection.send(strData);
        }
    };

    return wsConnection;
}
