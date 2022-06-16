const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API routes
app.get('/api/notes', (req, res) => {
    res.json(database);
});
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, database);
    res.json(newNote);
});

function createNote(newNote, notesArray){

    if(!notesArray){
        notesArray = [];
    }

    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return newNote;
}



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});