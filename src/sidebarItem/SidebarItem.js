import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core";
import styles from "./styles";
import { stripHtmlTags } from "../helpers/helpers";
import { Delete } from "@material-ui/icons";

class SidebarItem extends Component {
    render() {
        const { classes, note, noteIdx, selectedNoteIndex, selectNote, deleteNote } = this.props;
        return (
            <div>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === noteIdx}
                    alignItems="flex-start"
                >
                    <div
                        className={classes.textSection}
                        onClick={selectNote(note, noteIdx)}
                    >
                        <ListItemText
                            primary={note.title}
                            secondary={stripHtmlTags(note.body).substring(0, 30) + "..."}
                        />
                    </div>
                    <Delete
                        className={classes.deleteIcon}
                        onClick={deleteNote(note)}
                    />
                </ListItem>
            </div>
        )
    }
}

export default withStyles(styles)(SidebarItem);