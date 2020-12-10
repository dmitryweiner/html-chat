import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';

class Message extends React.Component {
    render() {
        const { nickname, content } = this.props;
        return (
            <ListItem>
                <ListItemText>
                    <Typography component="span" variant="body2" color="textPrimary">
                        {nickname}:&nbsp;
                    </Typography>
                    {content}
                </ListItemText>
            </ListItem>
        );
    }
}

export default Message;
