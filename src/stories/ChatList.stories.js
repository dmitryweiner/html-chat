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
            createdAt: '2020-10-20T03:48:24.735Z',
            title: 'Super chat',
            userId: '1',
            participants: ['1', '2'],
            isDialogue: false
        },
        {
            id: '2',
            createdAt: '2020-10-20T03:48:24.7351Z',
            title: 'Dialogue',
            userId: null,
            participants: ['1', '2'],
            isDialogue: true
        },
        {
            id: '3',
            createdAt: '2020-10-20T03:48:24.7351Z',
            title: 'Another super chat',
            userId: '2',
            participants: ['1', '2'],
            isDialogue: false
        },
        {
            id: '4',
            createdAt: '2020-10-20T03:48:24.7352Z',
            title: 'Another super chat 2',
            userId: '2',
            participants: ['2', '3'],
            isDialogue: false
        }
    ],
    goHandler: action('go'),
    joinHandler: action('join'),
    deleteHandler: action('delete')
};
