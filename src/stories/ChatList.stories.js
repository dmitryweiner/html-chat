import React from 'react';
import ChatList from '../components/ChatList';
import { action } from '@storybook/addon-actions';

export default {
    title: 'ChatList',
    component: ChatList
};

const Template = args => <ChatList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    userId: '1',
    list: [
        {
            id: '1',
            createdAt: '2020-11-11T11:16:03.901Z',
            title: 'Мой супер чат',
            userId: '1',
            participants: ['1', '2'],
            isPrivate: false
        },
        {
            id: '2',
            createdAt: '2020-11-11T11:16:03.9011Z',
            title: 'Не мой супер чат',
            userId: '2',
            participants: ['1', '2'],
            isPrivate: false
        },
        {
            id: '3',
            createdAt: '2020-11-11T11:16:03.9013Z',
            title: 'Мупер чат',
            userId: '2',
            participants: ['2', '3'],
            isPrivate: false
        }
    ],
    goHandle: action('go'),
    deleteHandle: action('delete'),
    joinHandle: action('join')
};
