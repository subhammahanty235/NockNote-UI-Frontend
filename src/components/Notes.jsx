import React, { useEffect, useRef, useContext ,useState} from "react";
import notecontext from '../context/notes/notecontext';
import Card from './Card';
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const closeref = useRef(null)
    const ref = useRef(null)
    const navigate = useNavigate()
    const context = useContext(notecontext);
    const { notes, getAllNotes, EditNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            navigate('/login')
        }
    }, [])
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    
    const handleClick = (e)=>{
        EditNote(note.id , note.etitle, note.edescription , note.etag);
        closeref.current.click();
    }
    
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    const[btntxt , setbtntxt] = useState("show")
    const [textonbutton , settob] = useState("click to Add a note")
    
    const showorhide = ()=>{
        if(btntxt === "show"){
            setbtntxt('hide')
            settob("Click to hide")
        }
        else{
            setbtntxt('show')
            settob("Click to Add a note")
        }
        console.log(textonbutton)
    }
    
    return (
        <>
        <div className="d-flex align-items-center justify-content-center text-center">
            <button className="btn btn-outline-success my-4" onClick={showorhide}> {textonbutton}</button>
            {/* <p className="text-center">{textonbutton}</p> */}

        </div>
             
            <AddNote prp={btntxt === 'show'?'hide':'show'} />

            <button type="button" className=" d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>

                                {/* <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h2 className="text-center">Your Notes</h2>
                <div className="d-flex my-4 mx-auto flex-wrap justify-content-center">
                
                    {/* {notes.length!==0? notes.map((note) => {
                        return <Card key={note._id} updateNote={updateNote} note={note} />
                    }): 'add some notes first'} */}
                    {notes.map((note) => {
                    return <Card key={note._id} updateNote={updateNote} note={note} />
                })}
                   
                </div>

            </div>
        </>
    )
}

export default Notes;