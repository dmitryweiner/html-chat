import React from 'react';
import PropTypes from 'prop-types';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isPrivate: false,
            error: ''
        };
    }

    validate() {
        this.setState({
            error: ''
        });
        if (this.state.title.length === 0) {
            this.setState({
                error: 'Введите название чата'
            });
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.props.handleSubmit({
                title: this.state.title,
                isPrivate: this.state.isPrivate
            });
            this.setState({ title: '', isPrivate: false });
        }
    }

    render() {
        const { title, isPrivate, error } = this.state;

        return (
            <>
                <h4>Создание/редактирование чата</h4>
                <form className="chat-form" onSubmit={e => this.handleSubmit(e)}>
                    <div>{error && <span style={{ color: 'red' }}>{error}</span>}</div>
                    <div>
                        <label>
                            Название чата:
                            <input
                                value={title}
                                type="text"
                                name="chat-title"
                                onChange={event => this.setState({ title: event.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Приватный:
                            <input
                                type="checkbox"
                                name="chat-title"
                                checked={isPrivate}
                                onChange={event =>
                                    this.setState({ isPrivate: event.target.checked })
                                }
                            />
                        </label>
                    </div>
                    <button type="submit">Сохранить</button>
                </form>
            </>
        );
    }
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default ChatForm;
