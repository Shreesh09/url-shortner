require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.get('/', (req, res) => {
    res.json({"hello": "world"});
})

app.post('/name', (req, res) => {
    console.log(req.body.first);
    if (req.body.last === "")
        res.json({ "error": 'error' });
    else
        res.json({ "error": '' });
})


const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});


