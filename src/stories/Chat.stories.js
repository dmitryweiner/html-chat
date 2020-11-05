import React from 'react';
import Chat from '../components/Chat';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Chat',
    component: Chat
};

const Template = args => <Chat {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    id: '853d59e4a2b8e',
    title: 'Мой первый чат',
    clickHandle: action('clicked!')
};
