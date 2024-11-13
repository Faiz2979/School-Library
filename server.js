const bodyParseer = require('body-parser');
const express = require('express');
const app =express();
const port = 7070;

const cors= require('cors');
app.use(bodyParseer.json());
app.use(bodyParseer.urlencoded({extended: true}));
app.use(cors());

const memberRoute = require('./routes/member.route');
const adminRoute = require('./routes/admin.route');
app.use('/member', memberRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
