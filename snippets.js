const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, UUID } = require('mongodb');

const mongoClient = require('./mongoClient.js');
const database = mongoClient.db("notecode");
const snippetsCollection = database.collection("snippets");

function generateUUID(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map(b => chars[b % chars.length])
        .join('');
}

router.post('/', (req, res) => {
    const { code, language, theme } = req.body;
    console.log(`Code: ${code}, Language: ${language}`);
    const snippet = {
        _id: generateUUID(10),
        code: code,
        language: language,
        theme: theme
    }
    console.log("Unique ID: ", snippet._id)
    snippetsCollection.insertOne(snippet)
        .then(result => {
            console.log("Document inserted", result.insertedId);
            res.status(200).json({ id: result.insertedId });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Failed to save snippet" });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // let searchUUID;

    // try {
    //     const searchUUID = new UUID(id)
    // } catch (error) {
    //     console.error(error);
    //     res.status(400).json({ message: "Invalid ID" });
    //     return;
    // }

    console.log(`Getting snippet with ID: ${id}`);
    snippetsCollection.findOne({ _id: id })
        .then(snippet => {
            if (snippet) {
                console.log("Snippet found: ", snippet);
                res.status(200).json(snippet);
            } else {
                res.status(404).json({ message: "Snippet not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Failed to get snippet" });
        });
});

module.exports = router;