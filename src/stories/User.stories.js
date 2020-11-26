import React from 'react';
import { action } from '@storybook/addon-actions';
import User from '@/components/User';

export default {
    title: 'User',
    component: User
};

const Template = args => <User {...args} />;

export const Main = Template.bind({});
Main.args = {
    id: '123',
    nickname: 'nickname',
    handleClick: action('click')
};
