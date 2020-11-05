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
                        id={chat.id}
                        title={chat.title}
                        clickHandle={this.props.clickHandle}
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
    clickHandle: PropTypes.func
};

export default ChatList;
