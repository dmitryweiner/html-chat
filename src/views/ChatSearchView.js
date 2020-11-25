import React from 'react';
import SearchChatForm from '@/components/SearchChatForm';
import ChatList from '@/components/ChatList';
import apiService from '@/apiService';

export default class ChatSearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            foundChats: []
        };
    }

    getChatList() {
        apiService.chat
            .search(this.state.title)
            .then(response => response.data)
            .then(foundChats => this.setState({ foundChats }));
    }

    handleChatSearch({ title }) {
        this.setState({ title });
        apiService.chat
            .search(title)
            .then(response => response.data)
            .then(foundChats => this.setState({ foundChats }));
    }

    // TODO: remove copy/paste
    goHandler(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandler(id) {
        if (!confirm('Вы действительно хотите вступить в этот чат?')) return;

        apiService.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Вы действительно хотите удалить этот чат?')) return;

        apiService.chat.delete(id).then(() => this.getChatList());
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <h1>Поиск чатов</h1>
                <SearchChatForm handleSubmit={data => this.handleChatSearch(data)} />
                <ChatList
                    userId={user.id}
                    list={this.state.foundChats}
                    goHandler={id => this.goHandler(id)}
                    joinHandler={id => this.joinHandler(id)}
                    deleteHandler={id => this.deleteHandler(id)}
                />
            </>
        );
    }
}
