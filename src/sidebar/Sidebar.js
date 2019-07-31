import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Button, List, Divider } from "@material-ui/core";
import SidebarItem from "../sidebarItem/SidebarItem";

class Sidebar extends Component {
    state = {
        addingNotes: false,
        title: ""
    };

    newNoteBtnClick = () => {
        this.setState({ addingNotes: !this.state.addingNotes, title: "" });
    }

    addNote = () => {
        this.props.addNote(this.state.title);
        this.newNoteBtnClick();
    }

    updateTitle = e => {
        this.setState({ title: e.target.value });
    }

    render() {
        const { addingNotes, title } = this.state;
        const { classes, selectedNoteIndex, notes, selectNote, deleteNote } = this.props;

        return (
            <div className={classes.sidebarContainer}>
                <Button
                    className={classes.newNoteBtn}
                    onClick={this.newNoteBtnClick}
                >
                    { addingNotes ? "Cancel" : "New Note" }
                </Button>
                { addingNotes && (
                    <div>
                        <input
                            type="text"
                            className={classes.newNoteInput}
                            placeholder="Enter note title"
                            onChange={this.updateTitle}
                            value={title}
                        />
                        <Button
                            className={classes.newNoteSubmitBtn}
                            onClick={this.addNote}
                        >
                            Add Note
                        </Button>
                    </div>
                )}
                <List>
                    { notes.map((note, i) => (
                        <div key={note.id}>
                            <SidebarItem
                                noteIdx={i}
                                note={note}
                                selectedNoteIndex={selectedNoteIndex}
                                selectNote={selectNote}
                                deleteNote={deleteNote}
                            />
                            <Divider />
                        </div>
                    )) }
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar);