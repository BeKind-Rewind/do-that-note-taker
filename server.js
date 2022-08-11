const express = require('express');
// setting environmental variable for port in case one is set; if not then use 3001
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');


// MIDDLEWARE
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware that directs server where to find the public files. Means that all the front-end code 
// can now be accessed (in public folder) without having a specific server endpoint created for it
app.use(express.static('public'));
app.use(routes);



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});