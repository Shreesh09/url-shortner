require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));
(async ()  => {
    try {
        console.log("Connecting to db...");
        await mongoose.connect(process.env['MONGO_URI'], {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to DB");
    } catch(err) {
        console.log(err);
    }
})();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

const urlRoute = require('./routes/urlRoute');
app.get('/', (req, res) => {
    res.json({"hello": "world"});
})

app.use('/api/', urlRoute);


const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});


