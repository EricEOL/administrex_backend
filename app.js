require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const requisitionRouter = require('./routes/requisitionRouter');
const mongoose = require('mongoose');

app.use(cors());

mongoose.connect(
    'mongodb://localhost/administrex', 
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log('Banco conectado!')
        }
    }
);

app.use('/user', express.json(), userRouter);
app.use('/admin', express.json(), adminRouter);
app.use('/requisition', express.json(), requisitionRouter);

app.listen(process.env.PORT, ()=> console.log('Server running...'))