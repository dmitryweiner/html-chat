import axios from 'axios';
import { isProduction } from '@/utils';

// eslint-disable-next-line sonarjs/no-all-duplicated-branches
export const URL = isProduction() ? 'shielded-anchorage-94550.herokuapp.com' : 'localhost:3001';
const PROTOCOL = isProduction() ? 'https' : 'http';

const axiosInstance = axios.create({
    baseURL: `${PROTOCOL}://${URL}`,
    withCredentials: true
});

/**
 * @see https://stackoverflow.com/a/61125727/3012961
 */
const jsonInterceptor = [response => response.data, error => Promise.reject(error)];
axiosInstance.interceptors.response.use(...jsonInterceptor);

export default {
    auth: {
        login: ({ nickname, password }) => axiosInstance.post('/auth', { nickname, password }),
        logout: () => axiosInstance.delete('/auth'),
        check: () => axiosInstance.get('/auth')
    },
    user: {
        create: ({ nickname, password }) => axiosInstance.post('/user', { nickname, password }),
        getCurrent: () => axiosInstance.get('/user'),
        getById: id => axiosInstance.get(`/user/${id}`),
        find: nickname => axiosInstance.get(`/user/?nickname=${nickname}`)
    },
    chat: {
        create: params => axiosInstance.post('/chat', params),
        getMyChats: userId => axiosInstance.get(`/chat/?participantId=${userId}`),
        search: title => axiosInstance.get(`/chat/?title=${title}`),
        getInfo: id => axiosInstance.get(`/chat/${id}`),
        delete: id => axiosInstance.delete(`/chat/${id}`),
        join: chatId => axiosInstance.put(`/chat/${chatId}`)
    },
    message: {
        create: ({ content, chatId }) => axiosInstance.post('/message', { content, chatId }),
        getMessages: chatId => axiosInstance.get(`/message/?chatId=${chatId}`),
        delete: id => axiosInstance.delete(`/message/${id}`)
    }
};
