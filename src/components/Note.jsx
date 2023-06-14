import moment from "moment";

function Note({ event, style, title, note, createdAt, comment }) {
    return (
        <div onClick={event} style={style} className="flex flex-col gap-4 bg-gray p-4 rounded-lg shadow-lg hover:cursor-pointer">
            <div className="note-header p-2 rounded-md border border-b-1 border-black flex items-center justify-between">
                <p className="text-xl truncate">{title}</p>
                <p className="text-2xl">{note}/20</p>
            </div>
            <div className="note-content flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-xl">Créé le :</p>
                    <p className="text-lg">{moment(createdAt).format("DD/MM/YYYY")}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Commentaire :</p>
                    <p className="text-lg font-light text-gray-800 truncate">{comment}</p>
                </div>
            </div>
        </div>
    );
}

export default Note;