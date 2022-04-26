const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note");
// const { body, validationResult } = require('express-validator');
//route 1 :get all notes using GET
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//add a new note using POST "api/notes/addnote"
router.post('/addnote', fetchuser,
    // [
    //     body('title', 'Enter a valid title').isLength({ min: 3 }),
    //     body('description', 'Enter a valid description , must be at least 8 characters').isLength({ min: 8 }),
    // ],

    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // const errors = validationResult();
            // if(!errors.isEmpty()){
            //     return res.status(400).json({ errors: errors.array() });
            // }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savednt = await note.save();
            res.json(savednt)
        } catch (error) {
            return res.status(400).send(error)
        }
    })
//update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newnote object
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
        //find the note to be updated ans upadte it :
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") };
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() != req.user.id) { return res.status(401).send("not allowed") }
        note = await Note.findByIdAndDelete(req.params.id);
        res.send("Succesfully deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;