import {useState} from "react";
import Button from "./Button.jsx";
import useNoteStore from "../../store/notes.js";

function Modal({ handleModal }) {
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [comment, setComment] = useState("")
    const { addNote } = useNoteStore()

    const handleCloseModal = () => {
        setTitle("")
        setNote("")
        setComment("")
        handleModal()
    }

    return (
        <div className="modal hidden bg-[#000000CB] fixed z-10 inset-0 overflow-y-auto">
            <form className="flex flex-col gap-2 rounded-md bg-white opacity-100 my-2 h-[80%]">
                <div className="flex flex-col gap-4 p-4">
                    <label className="text-2xl" htmlFor="title">Titre :</label>
                    <input data-testid="create-input-title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-1 border-gray-300 rounded-md pl-2 py-2" type="text" name="title" id="title" />
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <label className="text-2xl" htmlFor="note">Note :</label>
                    <input data-testid="create-input-note" value={note} onChange={(e) => setNote(e.target.value)}  className="border border-1 border-gray-300 rounded-md pl-2 py-2" type="text" name="note" id="note" placeholder="Par ex 16" />
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <label className="text-2xl" htmlFor="comment">Commentaire :</label>
                    <textarea data-testid="create-input-comment" value={comment} onChange={(e) => setComment(e.target.value)}  className="border border-1 border-gray-300 rounded-md pl-2 py-2" name="comment" id="comment" cols="30" rows="5"></textarea>
                </div>
                <div className="flex items-center justify-center gap-4 p-4">
                    <Button testid="create-todo" event={() => {
                        addNote(title, note, comment)
                        handleCloseModal()
                    }} text="Créer" classes="self-end bg-black text-white px-4 py-2 rounded-md hover:opacity-80 hover:cursor-pointer" />
                    <Button testid="close-todo"  event={handleCloseModal} text="Annuler" classes="self-end bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-80 hover:cursor-pointer" />
                </div>
            </form>
        </div>
    );
}

export default Modal;