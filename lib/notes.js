const fs = require("fs");
const path = require("path");


function filterByQuery(query, notesArray) {
    let noteTypeArr = [];
    // Note that we save the notesArray as filteredResults here:
    let filteredResults = notesArray;
    if (query.noteType) {
        // Save noteType as a dedicated array.
        // If noteType is a string, place it into a new array and save.
        if (typeof query.noteType === 'string') {
              noteTypeArr = [query.noteType];
        } else {
            noteTypeArr = query.noteType;
        }
        console.log(noteTypeArr);

        // Loop through each type in the noteType array:
        noteTypeArr.forEach(type => {
            // Check the type against each note in the filteredResults array.
            // Remember, it is initially a COPY of the notesArray,
            // but here we're updating it for each type in the .forEach() loop.
            // For each type being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the type,
            // so at the end we'll have an array of notes that have every one 
            // of the types when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                note => note.noteType.indexOf(type) !== -1
            );
        });
    }
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.type) {
        filteredResults = filteredResults.filter(note => note.type === query.type);
    }
    
    // return the filtered results:
    return filteredResults;
}


function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}


// function that accepts the POST route's req.body value & the array we want to add the data to
function createNewNote(body, notesArray) {
    // the array is notesArray because the function is for adding new note(s) to the catalog
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

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
    if (!note.noteType || !Array.isArray(note.noteType)) {
      return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
  };