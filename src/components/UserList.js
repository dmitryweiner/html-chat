import React from 'react';
import User from '@/components/User';

export default class UserList extends React.Component {
    render() {
        const { list, handleClick } = this.props;
        return (
            <ul>
                {list.map(user => (
                    <User
                        key={user.id}
                        id={user.id}
                        nickname={user.nickname}
                        handleClick={handleClick}
                    />
                ))}
            </ul>
        );
    }
}
