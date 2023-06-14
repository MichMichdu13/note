import { useState } from 'react';
import moment from 'moment';
import useNoteStore from '../../store/notes.js';
import Button from "../components/Button.jsx";

function DetailView({ id, event }) {
    const { updateNote, deleteNote, notes } = useNoteStore();
    const note = notes.find((note) => note.id === id);
    const [editing, setEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedNote, setUpdatedNote] = useState(note.note);
    const [updatedComment, setUpdatedComment] = useState(note.comment);
    const [updatedCreatedAt, setUpdatedCreatedAt] = useState(moment(note.createdAt).format('YYYY-MM-DD'));

    const handleEdit = () => {
        if (editing && !confirmDelete) {
            const updatedData = {
                title: updatedTitle,
                note: updatedNote,
                comment: updatedComment,
                createdAt: updatedCreatedAt,
            };
            updateNote(id, updatedData);
            event()
        } else if(confirmDelete) {
            setConfirmDelete(false)
        } else {
        setEditing(!editing);
        }
    };

    const handleDelete = () => {
        if (editing && !confirmDelete) {
            setEditing(false);
        } else if(!editing && !confirmDelete) {
            setConfirmDelete(true)
        } else {
            deleteNote(id);
            event()
        }
    };

    return (
        <div className="flex flex-col justify-center items-center relative">
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg w-1/2">
            <div className="note-header p-2 rounded-md border border-1 border-black flex items-center justify-between">
                {editing ? (
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="text-xl truncate border border-1 border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-xl truncate">{note.title}</p>
                )}
                {editing ? (
                    <input
                        type="text"
                        value={updatedNote}
                        onChange={(e) => setUpdatedNote(e.target.value)}
                        className="text-xl w-[30px] truncate border border-1 border-gray-300 rounded-md"
                    />
                ) : (
                    <p className="text-xl truncate">{note.note}/20</p>
                )}
            </div>
            <div className="note-content flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-xl">Créé le :</p>
                    {editing ? (
                        <input
                            type="date"
                            value={updatedCreatedAt}
                            onChange={(e) => { console.log(e.target.value); setUpdatedCreatedAt(e.target.value)}}
                            className="text-lg border border-1 border-gray-300 rounded-md"
                        />
                    ) : (
                        <p className="text-lg">{moment(note.createdAt).format('DD/MM/YYYY')}</p>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Commentaire :</p>
                    {editing ? (
                        <textarea
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                            className="text-lg font-light text-gray-800 truncate border border-1 border-gray-300 rounded-md"
                        />
                    ) : (
                        <p className="text-lg font-light text-gray-800 truncate">{note.comment}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                {editing && !confirmDelete ? (
                    <button onClick={handleEdit} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                        Enregistrer
                    </button>
                ) : !editing && !confirmDelete ? (
                    <button onClick={handleEdit} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                        Modifier
                    </button>
                ) : (
                    <button onClick={handleEdit} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                        Annuler
                    </button>
                )
                }
                {editing && !confirmDelete ? (
                    <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white">
                        Annuler
                    </button>
                ) : !editing && confirmDelete ? (
                    <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white">
                        Confirme la suppression
                    </button>
                ) : (
                    <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white">
                        Supprimer
                    </button>
                )}
            </div>
        </div>
            <Button event={event} text="Quitter" classes="mt-[200px] self-end bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:cursor-pointer" />

        </div>
    );
}

export default DetailView;
