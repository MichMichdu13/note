import ListView from "./views/ListView.jsx";
import {useState} from "react";
import DetailView from "./views/DetailView.jsx";

function App() {
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState(null)

    const handleEditMode = (id) => {
        setEditMode(true)
        setId(id)
    }

    const handleListMode = () => {
        setEditMode(false)
    }

  return (
    <div className="app p-20 h-screen w-screen">
        {!editMode && <ListView event={handleEditMode} />}
        {editMode && <DetailView id={id} event={handleListMode} />}
    </div>
  )
}

export default App
