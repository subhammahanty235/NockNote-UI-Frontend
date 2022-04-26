import React, { useState } from "react";
import notecontext from "./notecontext";


const Notestate = (props) => {
  const host = "http://localhost:5000"
  const initialnotes = []
  const [notes, setnotes] = useState(initialnotes);
  const token = localStorage.getItem('token')
  //get all notes
  const getAllNotes = async()=>{
      //api call
      const responce = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
        
      })
      const json = await responce.json();
      // console.log(json)
      setnotes(json)
  }
  // const [notes, setnotes] = useState();

  //add a note 
  
  const Addnote = async(title, description, tag) => {
    //api call
    const responce = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title , description , tag})
    })
    // const json =  responce.json();
    
    const note = await responce.json();
    setnotes(notes.concat(note))
  }
  // delete a note
  const DeleteNote = async(id) => {
    //api call
    const responce = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      // body: JSON.stringify(data)
    })
    // const json =  responce.json();
  

    console.log("deleteing" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes);
  }
  //edit a note
  const EditNote = async (id, title, description, tag) => {
    //api call

    const responce = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title , description, tag})
    })
    // const json =await  responce.json();
    let newnotes = JSON.parse(JSON.stringify(notes))

  for(let i = 0;i <newnotes.length;i++){
    const element = newnotes[i];
    if(element._id === id){
      newnotes[i].title = title;
      newnotes[i].description = description;
      newnotes[i].tag = tag;
      break;
    }
  }
  setnotes(newnotes)
}

// const sendmail=(email_id ,otp)=>{
//   let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//       user:'mahantysubham57@gmail.com',
//       pass : 'subham@1234'
//     }
//   });
//   let mailoptions = {
//     from:'mahantysubham57@gmail.com',
//     to:email_id,
//     subject:'OTP for password reset',
//     text:`hello , here's your otp for password reset ${otp}`
//   }
//   transporter.sendmail(mailoptions , (err, info)=>{
//     if(err)console.log(err)
//     else console.log("message sent"+info.responce)
//   })
// }
  return (
    <notecontext.Provider value={{ notes, setnotes,getAllNotes, Addnote, DeleteNote, EditNote  }}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Notestate