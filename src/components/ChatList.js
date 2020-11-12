import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

/**
 * Компонент для отображения списка чатов
 */
class ChatList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.list.map(chat => (
                    <Chat
                        userId={this.props.userId}
                        chat={chat}
                        goHandle={this.props.goHandle}
                        joinHandle={this.props.joinHandle}
                        deleteHandle={this.props.deleteHandle}
                        key={chat.id}
                    />
                ))}
            </ul>
        );
    }
}

ChatList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string
        })
    ),
    userId: PropTypes.string,
    goHandle: PropTypes.func,
    joinHandle: PropTypes.func,
    deleteHandle: PropTypes.func
};

export default ChatList;
