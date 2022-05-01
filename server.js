const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const path = require("path");
const notes = require("./db/db.json");
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

app.post("/notes", (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body);
    console.log(notes);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notes}, null, 2)
    );
    res.json(notes);//idk about these two lol
    return notes; //idk about these two lol
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
  })