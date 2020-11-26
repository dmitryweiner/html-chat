import React from 'react';

export default class User extends React.Component {
    render() {
        const { id, nickname, handleClick } = this.props;
        return (
            <li>
                {nickname}&nbsp;
                <button onClick={() => handleClick(id)}>диалог</button>
            </li>
        );
    }
}
