import React from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент для отображения чата в списке чатов
 */
class Chat extends React.Component {
    innerClickHandle(e) {
        e.preventDefault();
        this.props.goHandle(this.props.chat.id);
    }

    isOwner() {
        return this.props.chat.userId === this.props.userId;
    }

    isParticipant() {
        return this.props.chat.participants.includes(this.props.userId);
    }

    renderChat() {
        if (this.isOwner()) {
            return (
                <>
                    <a href="/" onClick={e => this.innerClickHandle(e)}>
                        {this.props.chat.title}
                    </a>
                    <button onClick={() => this.props.deleteHandle(this.props.chat.id)}>
                        удалить
                    </button>
                </>
            );
        }

        if (this.isParticipant()) {
            return (
                <a href="/" onClick={e => this.innerClickHandle(e)}>
                    {this.props.chat.title}
                </a>
            );
        }

        return (
            <>
                <span>{this.props.chat.title}</span>
                <button onClick={() => this.props.joinHandle(this.props.chat.id)}>вступить</button>
            </>
        );
    }

    render() {
        return <li>{this.renderChat()}</li>;
    }
}

Chat.propTypes = {
    userId: PropTypes.string.isRequired,
    chat: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        participants: PropTypes.arrayOf(PropTypes.string),
        createdAt: PropTypes.string
    }).isRequired,
    goHandle: PropTypes.func,
    joinHandle: PropTypes.func,
    deleteHandle: PropTypes.func
};

export default Chat;
