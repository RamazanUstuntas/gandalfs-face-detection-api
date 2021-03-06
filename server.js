const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

//edit according to your own situation
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : '',
    password : '',
    database : 'gandalfs-face-detection'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())



app.listen(3000, () => {
  console.log('app is running on port 3000')
})
