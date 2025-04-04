const express = require("express");
const notesSchema = require("../models/notes.model.js");
const {authenticateToken} = require("../utilities.js");


const NotesRounter = express.Router();

// Add new Notes fro some specific user 
NotesRounter.post("/add", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const user = req.user; // Get user from authenticated request

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }
    if (!content) {
        return res.status(400).json({
            message: "Content is required"
        });
    }

    try {
        const note = new notesSchema({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Notes added successfully!!"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error" // (typo fixed: "messgae" → "message")
        });
    }
});

// Edit existing note by ID
NotesRounter.put("/edit/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const user = req.user;

    if (!title && !content && !tags && typeof isPinned === "undefined") {
        return res.status(400).json({
            error: true,
            message: "No changes provided!"
        });
    }

    try {
        // ✅ Use the correct model name
        const note = await notesSchema.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found!"
            });
        }

        // ✅ Update fields if present
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (typeof isPinned !== "undefined") note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        });

    } catch (error) {
        console.error(error); // Helpful for debugging
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

NotesRounter.get("/getAllNotes", authenticateToken, async (req, res) => {
    const user = req.user;

    try {
         // ✅ Use the correct model name
        const notes = await notesSchema.find({userId: user._id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrived successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

NotesRounter.delete("/deleteNotes/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const user = req.user;

    try {
        const note = await notesSchema.find({_id: noteId, userId: user._id});
        if(!note){
            return res.status(400).json({
                error: true,
                message: "Note not found!"
            })
        }
        await notesSchema.deleteOne({_id: noteId, userId: user._id});

        return res.json({
            error: false,
            message: "Note deleted Successfully"
        })
    } catch (error) {
        return res.json({
            error: true,
            message: "Internal Server Error"
        })
    }
})







module.exports = NotesRounter;