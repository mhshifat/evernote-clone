import React, { Component } from 'react';
import firebase from "firebase";
import Sidebar from "./sidebar/Sidebar";
import Editor from "./editor/Editor";

class App extends Component {
  state = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: []
  };

  componentWillMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(snapshot => {
        const notes = snapshot.docs.map(document => ({id: document.id, ...document.data()}));
        this.setState({notes});
      })
  }

  selectNote = (note, noteIdx) => () => {
    this.setState({
      selectedNoteIndex: noteIdx,
      selectedNote: note
    })
  }

  noteUpdate = note => {
    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .update({
        title: note.title,
        body: note.body,
        timestamps: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  addNote = title => {
    firebase
      .firestore()
      .collection("notes")
      .add({
        title,
        body: "",
        timestamps: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(note => {
        const selectedNote = this.state.notes.filter((n) => n.id === note.id)[0];
        const selectedNoteIndex = this.state.notes.indexOf(selectedNote);
        this.setState({
          selectedNote,
          selectedNoteIndex
        })
      })
      .catch(err => console.log(err));
  }

  deleteNote = note => () => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      firebase
        .firestore()
        .collection("notes")
        .doc(note.id)
        .delete()
        .then(async () => {
          await this.setState({
            notes: this.state.notes.filter(n => n.id !== note.id)
          })
          if (note.id !== (this.state.selectedNote && this.state.selectedNote.id)) {
            this.setState({
              selectedNote: this.state.selectedNote || this.state.notes[0],
              selectedNoteIndex: this.state.selectedNoteIndex || 0
            })
          } else {
            this.setState({
              selectedNote: this.state.notes[0],
              selectedNoteIndex: 0
            })
          }
        })
    }
  }

  render() {
    const { selectedNoteIndex, selectedNote, notes } = this.state;

    return (
      <div className="app-container">
        <Sidebar
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
          selectNote={this.selectNote}
          addNote={this.addNote}
          deleteNote={this.deleteNote}
        />
        { selectedNote && <Editor
          note={selectedNote}
          noteIdx={selectedNoteIndex}
          notes={notes}
          noteUpdate={this.noteUpdate}
        /> }
      </div>
    )
  }
}

export default App;
