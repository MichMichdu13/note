import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";
import Modal from "../components/Modal.jsx";
import useNoteStore from "../../store/notes.js";
import Note from "../components/Note.jsx";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";

function ListView( { event }) {
    const [search, setSearch] = useState("")
    const [displayedNotes, setDisplayedNotes] = useState([])
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const { notes } = useNoteStore()

    useEffect(() => {
        let sortedNotes = notes;

        if (sortBy === "date") {
            sortedNotes = notes.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (sortOrder === "asc") {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
        }

        if (sortBy === "note") {
            sortedNotes = notes.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.note - b.note;
                } else {
                    return b.note - a.note;
                }
            });
        }

        const filteredNotes = sortedNotes.filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.note.toLowerCase().includes(search.toLowerCase()) ||
            note.comment.toLowerCase().includes(search.toLowerCase())
        );

        setDisplayedNotes(filteredNotes);
    }, [notes, search, sortBy, sortOrder])

    const handleModal = () => {
        const modal = document.querySelector(".modal")
        modal.classList.toggle("hidden")
        modal.classList.toggle("flex")
        modal.classList.toggle("justify-center")
        modal.classList.toggle("items-center")
    }

    return (
        <div className="flex flex-col gap-10 h-full">
            <Modal handleModal={handleModal} />
            <div className="search-bar p-4 border-2 rounded-md flex items-center justify-between gap-6">
                <div className="order-btns flex items-center gap-6">
                    <Button event={() => {
                        setSortBy("note")
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }} icon={sortOrder === "asc" && sortBy === "note" ? <CaretUpOutlined /> : sortOrder === "desc" && sortBy === "note" ? <CaretDownOutlined /> : null} text="Trier par note" classes="flex items-center gap-2 font-sans text-black bg-white rounded-lg py-2 px-6 hover:bg-black hover:text-white hover:cursor-pointer" />
                    <Button event={() => {
                        setSortBy("date")
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }} icon={sortOrder === "asc" && sortBy === "date" ? <CaretUpOutlined /> : sortOrder === "desc" && sortBy === "date" ? <CaretDownOutlined /> : null} text="Trier par date" classes="flex items-center gap-2 font-sans text-black bg-white rounded-lg py-2 px-6 hover:bg-black hover:text-white hover:cursor-pointer" />
                </div>
                <div className="search-bar flex items-center gap-4">
                    <p className="text-2xl">Rechercher une note :</p>
                    <input className="border border-1 border-gray-300 rounded-md pl-2 py-2" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="notes-list h-[80%] overflow-y-auto flex flex-wrap gap-8">
                {displayedNotes.map((note) => {
                    const bg = note.note < 8 ? "red" : note.note < 10 ? "orange" : note.note < 13 ? "yellow" : "green"
                    return (
                        <Note event={() => event(note.id)} style={{width: "300px", height: "250px", background: bg}} key={note.id} title={note.title} note={note.note} comment={note.comment} createdAt={note.createdAt}  />
                    )
                } )}
            </div>
            <Button event={handleModal} text="Créer une note" classes="self-end bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:cursor-pointer" />
        </div>
    );
}

export default ListView;