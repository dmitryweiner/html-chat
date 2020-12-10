import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                <form className="chat-form" onSubmit={e => this.handleSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!error}
                                helperText={error}
                                fullWidth
                                name="chat-title"
                                label="Название чата"
                                value={title}
                                onChange={e => this.setState({ title: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isPrivate}
                                        onChange={event =>
                                            this.setState({
                                                isPrivate: event.target.checked
                                            })
                                        }
                                        name="chat-is-private"
                                        color="primary"
                                    />
                                }
                                label="Приватный"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}

ChatForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default ChatForm;
