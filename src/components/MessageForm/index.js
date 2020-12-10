import React from 'react';
import styles from './styles.module.css';
import { Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    handleSend(event) {
        event.preventDefault();
        this.props.postMessage({
            content: this.state.content
        });
        this.setState({ content: '' });
    }

    render() {
        const { content } = this.state;

        return (
            <form className="message-form" onSubmit={event => this.handleSend(event)}>
                <div className={styles.root}>
                    <div className={styles.message}>
                        <TextField
                            fullWidth
                            name="content"
                            label="Введите своё сообщение"
                            variant="outlined"
                            value={content}
                            onChange={e => this.setState({ content: e.target.value })}
                        />
                    </div>
                    <div className={styles.button}>
                        <IconButton color="primary" aria-label="upload picture" type="submit">
                            <Send />
                        </IconButton>
                    </div>
                </div>
            </form>
        );
    }
}

export default MessageForm;
