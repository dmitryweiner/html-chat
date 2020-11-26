import React from 'react';
import { action } from '@storybook/addon-actions';
import UserList from '@/components/UserList';

export default {
    title: 'UserList',
    component: UserList
};

const Template = args => <UserList {...args} />;

export const Main = Template.bind({});
Main.args = {
    list: [
        {
            id: '1',
            nickname: 'nickname1'
        },
        {
            id: '2',
            nickname: 'nickname2'
        },
        {
            id: '3',
            nickname: 'nickname3'
        }
    ],
    handleClick: action('click')
};
