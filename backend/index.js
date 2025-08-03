const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.mongo_uri)
    .then(()=>console.log("db connected"))
    .catch((e)=>console.log(e.message));

app.use('/api/auth',require('./routes/auth'));

app.use('/api/application',require('./routes/application'));

app.use('/api/message',require('./routes/messages'));

app.use('/api/slot', require('./routes/slot'));

app.listen(5000);