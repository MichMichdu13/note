import useNoteStore from "../store/notes.js";
import { expect, describe, it, beforeEach } from 'vitest';


describe('useNoteStore', () => {
    beforeEach(() => {
        useNoteStore.getState().reset();
    });

    it('should add a note', () => {
        const { addNote } = useNoteStore.getState();
        addNote('Title', 'Note', 'Comment');
        const { notes } = useNoteStore.getState();
        expect(notes.length).toBe(1);
    });

    it('should update a note', () => {
        const { addNote, updateNote } = useNoteStore.getState();
        addNote('Title', 'Note', 'Comment');
        const note = useNoteStore.getState().notes[0];
        updateNote(note.id, { title: 'New Title' });
        const { notes } = useNoteStore.getState();
        expect(notes[0].title).toBe('New Title');
    });

    it('should delete a note', () => {
        const { addNote, deleteNote } = useNoteStore.getState();
        addNote('Title', 'Note', 'Comment');
        const note = useNoteStore.getState().notes[0];
        deleteNote(note.id);
        const { notes } = useNoteStore.getState();
        expect(notes.length).toBe(0);
    });
});
