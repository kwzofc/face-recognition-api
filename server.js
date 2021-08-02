const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ], 
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  // bcrypt.compare("apples", '$2a$10$cMARfZQ5zlcCjYBFfpyxc.btI6nQP1eMQQ7Zg4tHzfXSMR6TcN5Ba', function(err, res) {
  //   console.log('first guess', res);
  // });
  // bcrypt.compare("bacon", '$2a$10$cMARfZQ5zlcCjYBFfpyxc.btI6nQP1eMQQ7Zg4tHzfXSMR6TcN5Ba', function(err, res) {
  //   console.log('second guess', res);
  // });
  if (req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password) {
        res.json(database.users[0]);
      } else {
        res.status(400).json('error logging in');
      }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('Not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('Not found');
  }
});

// bcrypt.hash("bacon", null, null, function(err, hash) {

// });

// bcrypt.compare("bacon", hash, function(err, res) {

// });

// bcrypt.compare("veggies", hash, function(err, res) {

// });

app.listen(3000, () => {
  console.log('app is running on port 3000');
});