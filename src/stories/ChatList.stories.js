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
    list: [
        {
            id: '853d59e4a2b8e',
            createdAt: '2020-10-20T03:48:24.735Z',
            title: 'Super chat'
        },
        {
            id: '9e4a2b8e853d5',
            createdAt: '2020-10-20T03:48:24.735Z',
            title: 'Another super chat'
        }
    ],
    clickHandle: action('clicked!')
};
