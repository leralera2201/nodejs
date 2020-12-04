const express = require('express');
const db = require('./database').getInstance();

const app = express();

db.setModels();

const { userRoutes } = require('./routes');

app.use(express.json());

app.use('/users', userRoutes);

app.listen(5000, () => {
    console.log('App is listened on 5000');
});
