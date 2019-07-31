import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ReactQuill from "react-quill";
import { debounce } from "../helpers/helpers";

class Editor extends Component {
    state = {
        id: "",
        title: "",
        body: ""
    };

    componentDidMount = () => {
        this.setState({
            id: this.props.note.id,
            title: this.props.note.title,
            body: this.props.note.body
        })
    }

    componentDidUpdate = () => {
        if (this.props.note.id !== this.state.id) {
            this.setState({
                id: this.props.note.id,
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    updateBody = async val => {
        await this.setState({body: val});
        this.saveToDatabase();
    }

    saveToDatabase = debounce(() => {
        this.props.noteUpdate(this.state);
    })

    render() {
        const { body } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={body}
                    onChange={this.updateBody}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Editor);