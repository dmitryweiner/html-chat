class Message extends React.Component {
    render() {
        const { nick, message } = this.props;
        return <li>
            <b>{nick}:</b>
            {message}
        </li>;
    }
}

Message.propTypes = {
    nick: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};
