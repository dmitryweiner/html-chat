import React from 'react';
import Message from './Message';
import List from '@material-ui/core/List';

class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;
        return (
            <List className="message-list">
                {messages.map(message => (
                    <Message
                        content={message.content}
                        nickname={message.nickname}
                        key={message.id}
                    />
                ))}
            </List>
        );
    }
}

export default MessagesList;
