import React from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент для отображения чата в списке чатов
 */
class Chat extends React.Component {
    innerClickHandle(e) {
        e.preventDefault();
        this.props.clickHandle(this.props.id);
    }

    render() {
        return (
            <li>
                <a href="/" onClick={e => this.innerClickHandle(e)}>
                    {this.props.title}
                </a>
            </li>
        );
    }
}

Chat.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    clickHandle: PropTypes.func
};

export default Chat;
