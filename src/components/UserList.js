import React from 'react';
import PropTypes from 'prop-types';
import User from '@/components/User';
import List from '@material-ui/core/List';

export default class UserList extends React.Component {
    render() {
        const { list, handleClick } = this.props;
        return (
            <List>
                {list.map(user => (
                    <User
                        key={user.id}
                        id={user.id}
                        nickname={user.nickname}
                        handleClick={handleClick}
                    />
                ))}
            </List>
        );
    }
}

UserList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            nickname: PropTypes.string.isRequired
        })
    ),
    handleClick: PropTypes.func.isRequired
};
