const path = require('path');
const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

// Tell the server any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
// If '/' is the endpoint, then the router will serve back our HTML routes.
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;