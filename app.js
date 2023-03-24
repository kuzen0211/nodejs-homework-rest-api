const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

mongoose
    .connect(MONGO_URL)
    .then(con => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.log(err);

        process.exit(1);
    });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Oops. Resourse not found' });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
