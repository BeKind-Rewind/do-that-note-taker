const router = require('express').Router();
const { findById, filterByQuery, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const uuid = require('uuid');

// to ADD the route referenced above:
router.get('/', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
    }
);
  
router.get('/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
    }
);

router.post('/', (req, res) => {
    // req.body is where our incoming content will be
    // generate the id value on the server (the server can see all of the data so there are no duplicates)
    // in this case, we are telling to generate +1 to the highest id since the array is marked in order
    req.body.id = uuid.v4();
    // warning: this method works unless data is removed from the array

    // if any data is req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    req.remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end();
            } else {
                res.status(404).json({message: "Not found"})
            }
        })
        .catch(err => {
            res.status(500).json({ err })
        })
        // res.status(200).send('Note successfully removed.')
    
});

module.exports  = router;