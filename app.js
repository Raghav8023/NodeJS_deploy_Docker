const express = require('express');
const mongodb = require('mongodb');
const app = express();

let db;

mongodb.MongoClient.connect('mongodb://mongodb:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = client.db('mydb');

    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/data', (req, res) => {
    db.collection('data').find({}).toArray((err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(data);
    });
});

