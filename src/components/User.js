import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

export default class User extends React.Component {
    render() {
        const { id, nickname, handleClick } = this.props;
        return (
            <ListItem button>
                <ListItemText>{nickname}</ListItemText>
                <ListItemSecondaryAction onClick={() => handleClick(id)}>
                    <IconButton edge="end">
                        <BorderColorIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

User.propTypes = {
    id: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};
