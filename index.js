const express = require('express');
const snippetsRouter = require('./snippets');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/snippets", snippetsRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

module.exports = app;