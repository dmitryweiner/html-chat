import React from 'react';
import PropTypes from 'prop-types';
import Chat from '@/components/Chat';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

/**
 * Компонент для отображения списка чатов
 */
class ChatList extends React.Component {
    render() {
        if (!this.props.list.length) {
            return <span>Список чатов пуст</span>;
        }

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    <List className="chat-list">
                        {this.props.list.map(chat => (
                            <Chat
                                userId={this.props.userId}
                                chat={chat}
                                goHandler={this.props.goHandler}
                                joinHandler={this.props.joinHandler}
                                deleteHandler={this.props.deleteHandler}
                                key={chat.id}
                            />
                        ))}
                    </List>
                </Grid>
            </Grid>
        );
    }
}

ChatList.propTypes = {
    userId: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            participants: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    goHandler: PropTypes.func,
    joinHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};

export default ChatList;
