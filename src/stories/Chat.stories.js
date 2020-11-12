import React from 'react';
import Chat from '../components/Chat';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Chat',
    component: Chat
};

const Template = args => <Chat {...args} />;

const chat = {
    id: '0b634621ac63b',
    createdAt: '2020-11-11T11:16:03.9013Z',
    title: 'Мой супер чат',
    userId: 'c5acc3193e83b',
    participants: ['c5acc3193e83b', 'db6bb9ac9d72f'],
    isPrivate: false
};

export const ChatOwner = Template.bind({});
ChatOwner.args = {
    userId: 'c5acc3193e83b',
    chat,
    goHandle: action('go'),
    deleteHandle: action('delete'),
    joinHandle: action('join')
};

export const ChatParticipant = Template.bind({});
ChatParticipant.args = {
    userId: 'db6bb9ac9d72f',
    chat,
    goHandle: action('go'),
    deleteHandle: action('delete'),
    joinHandle: action('join')
};

export const NotParticipant = Template.bind({});
NotParticipant.args = {
    userId: 'fd156gsd6fg',
    chat,
    goHandle: action('go'),
    deleteHandle: action('delete'),
    joinHandle: action('join')
};
