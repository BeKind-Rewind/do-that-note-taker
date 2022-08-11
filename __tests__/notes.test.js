const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes.js");
const { notes } = require("../db/db.json");

jest.mock('fs');

test("creates a note object", () => {
    const note = createNewNote(
        { 
            id:"1", 
            title: "Pets", 
            text: "give medicine" 
        }, notes );

  expect(note.id).toBe("1");
  expect(note.title).toBe("Pets")
  expect(note.text).toBe("give medicine");
});


test("finds by id", () => {
    const startingNotes = [
        {
            id: "1",
            title: "Pets",
            text: "give medicine"
        },
    ];

  const result = findById("1", startingNotes);

  expect(result.title).toBe("Pets");
});



test("filters by query", () => {
    const startingNotes = [
        {
            id: "1",
            title: "Pets",
            text: "give medicine"
        },
    ];

    const updatedNotes = filterByQuery({ title: "Pets" }, startingNotes);

    expect(updatedNotes.length).toEqual(1);
});


test("validates note text", () => {
    const note = {
        id: "1",
        title: "Pets",
        text: "give medicine"
    };

    const invalidNote = {
        id: "1",
        title: "Pets"
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});