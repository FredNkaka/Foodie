const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauce = require('./models/sauce');

const app = express();

mongoose.connect('mongodb+srv://mongodb+srv://will:o6L2ZJiK2voCwuIG@cluster0-czsym.mongodb.net/test?retryWrites=true')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas.');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas.');
        console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    const sauce = new sauce({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'sauce saved successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.get('/api/sauces/:id', (req, res, next) => {
    sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res,
            status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
});

app.put('/api/sauces/:id', (req, res, next) => {
    const sauce = new sauce({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    sauce.updateOne({
        _id: req.params.id
    }, sauce).then(
        () => {
            res.status(200).json({
                message: 'sauce updated successfully.'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.delete('/api/sauces/:id', (req, res, next) => {
    sauce.deleteOne({
        _id: req.params.id
    }).then(
        () => {
            res.status(200).json({
                message: 'sauce deleted successfully.'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/sauces', (req, res, next) => {
    sauce.find().then(
        (sauces) => {
            res,
            status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
});



module.exports = app;
