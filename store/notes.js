import create from 'zustand';
import { persist } from 'zustand/middleware';

const useNoteStore = create(persist(
    (set) => ({
        notes: [],

        addNote: (title, note, comment) => {
            const newNote = {
                id: Date.now(),
                title,
                note,
                comment,
                createdAt: new Date().toISOString()
            };

            set((state) => ({ notes: [...state.notes, newNote] }));
        },

        updateNote: (id, updatedData) => {
            set((state) => ({
                notes: state.notes.map((note) => {
                    if (note.id === id) {
                        return { ...note, ...updatedData };
                    }
                    return note;
                })
            }));
        },

        deleteNote: (id) => {
            set((state) => ({
                notes: state.notes.filter((note) => note.id !== id)
            }));
        },

        reset: () => {
            set({ notes: [] });
        }
    }),
    {
        name: 'note-store',
        getStorage: () => localStorage
    }
));

export default useNoteStore;
