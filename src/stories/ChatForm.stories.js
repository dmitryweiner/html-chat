import React from 'react';
import { action } from '@storybook/addon-actions';
import ChatForm from '../components/ChatForm';

export default {
    title: 'ChatForm',
    component: ChatForm
};

const Template = args => <ChatForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    handleSubmit: action('submit')
};
