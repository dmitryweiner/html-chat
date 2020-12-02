import React from 'react';
import { action } from '@storybook/addon-actions';
import ViewHeader from '@/views/ViewHeader';

export default {
    title: 'ViewHeader',
    component: ViewHeader
};

const InnerView = props => {
    return (
        <div>
            Я внутренний компонент для проверки.
            <button onClick={() => props.history.push('/test')}>history push</button>
        </div>
    );
};

const Template = args => (
    <ViewHeader {...args}>
        <InnerView />
    </ViewHeader>
);

const commonArgs = {
    menuHandler: action('menu'),
    logoutHandler: action('logout'),
    history: {
        push: action('history.push')
    },
    title: 'Заголовок страницы'
};

export const Logged = Template.bind({});
Logged.args = {
    user: {
        id: 'a17413f820d48',
        createdAt: '2020-10-20T03:48:24.718Z',
        nickname: 'test'
    },
    ...commonArgs
};

export const NotLogged = Template.bind({});
NotLogged.args = {
    user: null,
    ...commonArgs
};
