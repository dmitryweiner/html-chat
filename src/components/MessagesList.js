import React from 'react';
import Message from './Message';

class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;
        return (
            <ul>
                {messages.map((message, index) => (
                    <Message nick={message.nick} message={message.message} key={index} />
                ))}
            </ul>
        );
    }
}

export default MessagesList;
