class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;
        return <ul>
            {messages.map((message, index) => (
                <Message nick={message.nick} message={message.message} key={index}/>
            ))}
        </ul>;
    }
}
