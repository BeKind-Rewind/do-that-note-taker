const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

router.use("/notes", noteRoutes);

module.exports = router;