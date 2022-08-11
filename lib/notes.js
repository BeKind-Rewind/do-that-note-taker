const fs = require("fs");
const path = require("path");


function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function filterByQuery(query, notesArray) {
    
    let filteredResults = notesArray;
    
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.type === query.text);
    }
    
    // return the filtered results:
    return filteredResults;
}




// function that accepts the POST route's req.body value & the array we want to add the data to
function createNewNote(body, notesArray) {
    // the array is notesArray because the function is for adding new note(s) to the catalog
    const note = body;
    notesArray.push(note);
    saveNotes(notesArray);
    // return finished code to post route for response
    return note;
}


function validateNote(note) {
    if (!note.id || typeof note.id !== 'string') {
      return false;
    }
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.title !== 'string') {
      return false;
    }
    return true;
}


function saveNotes(notes) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
}

function deleteNote(id, notesArray) {
    const noteIndex = notesArray.findIndex((note) => {
        return note.id === id;
    })
    notesArray.splice(noteIndex, 1);

    saveNotes(notesArray);

}

module.exports = {
    findById,
    filterByQuery,
    createNewNote,
    validateNote,
    deleteNote,
  };