const express = require('express');
const app = express();

// default port to listen on
const PORT = 8000;

// home page -> /
app.get('/', (request, response) => {
    response.send("Suh dude!");
    console.log("Traffic received!");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT -> ${PORT}`);
});