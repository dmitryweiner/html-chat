import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit, MeetingRoom, PersonAdd } from '@material-ui/icons';

/**
 * Компонент для отображения чата в списке чатов
 * @class Chat
 */
class Chat extends React.Component {
    isOwner() {
        return this.props.userId === this.props.chat.userId;
    }

    isParticipant() {
        return this.props.chat.participants.includes(this.props.userId);
    }

    render() {
        if (this.isOwner()) {
            return (
                <ListItem button onClick={() => this.props.goHandler(this.props.chat.id)}>
                    <ListItemText>{this.props.chat.title}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="edit">
                            <Edit />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => this.props.deleteHandler(this.props.chat.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
        if (this.isParticipant()) {
            return (
                <ListItem button onClick={() => this.props.goHandler(this.props.chat.id)}>
                    <ListItemText>{this.props.chat.title}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="exit">
                            <MeetingRoom />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
        return (
            <ListItem button>
                <ListItemText>{this.props.chat.title}</ListItemText>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="join"
                        onClick={() => this.props.joinHandler(this.props.chat.id)}
                    >
                        <PersonAdd />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

Chat.propTypes = {
    userId: PropTypes.string.isRequired,
    chat: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        participants: PropTypes.arrayOf(PropTypes.string)
    }),
    goHandler: PropTypes.func,
    joinHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};

export default Chat;
