const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const socket = require("socket.io")


const users = require('./routes/api/users');
const clients = require('./routes/api/clients');
const chats = require('./routes/api/chats');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/clients',clients);
app.use('/api/chats',chats);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server = app.listen(port, () => console.log(`Server running on port ${port}`));
io = socket(server);
io.on('connection', (socket) => {
    

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});