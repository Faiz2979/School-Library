
const express = require('express');
const app =express();
const port = 7070;

const cors= require('cors');
app.use(cors());

// Middleware
const memberRoute = require('./routes/member.route');
const adminRoute = require('./routes/admin.route');
const bookRoute = require('./routes/book.route');
const borrowRoute = require('./routes/borrow.route');

const auth=require('./routes/auth.route');

app.use('/auth',auth);
app.use('/member', memberRoute);
app.use('/borrow', borrowRoute);
app.use('/admin', adminRoute);
app.use('/book', bookRoute);
app.use('/cover', express.static('cover'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
