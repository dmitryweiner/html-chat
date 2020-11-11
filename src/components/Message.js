import React from 'react';

class Message extends React.Component {
    render() {
        const { nick, content } = this.props;
        return (
            <li>
                <b>{nick}:</b>
                {content}
            </li>
        );
    }
}

export default Message;
