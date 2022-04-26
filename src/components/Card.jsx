import React ,{useContext} from 'react'
import '../App.css'
import notecontext from '../context/notes/notecontext';
function Card(props) {
    const context = useContext(notecontext);
    const {DeleteNote} = context ;
    const {note , updateNote} = props;
    
    return (
        <>
            <div className="card mx-3 my-3 notecard" style={{width: "18rem"}}>
                {/* <img src="..." className="card-img-top" alt="..."> */}
                    <div className="card-body">
                        <h5 className="card-title text-center">{note.title}</h5>
                        <hr />
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2 " onClick={()=>{DeleteNote(note._id)}} ></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>
        </>
    )
}

export default Card