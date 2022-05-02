const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const path = require("path");
let notes = require("./db/db.json");
const fs = require("fs");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
    let noteID = () => {
        if (!notes[notes.length - 1].id) {
            return 1;
        } else {
            return parseInt(notes[notes.length - 1].id) + 1;
        }
    }
    req.body.id = noteID().toString();
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes, null, 2)
    );
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notes, null, 2)
    );
    res.json(notes);
});

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
  })