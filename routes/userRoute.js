const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuth, getToken } = require('../utils');

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  const newUser = await user.save();

  try {
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.send('Invalid Data');
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).send('Server Error');
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Burhan',
      email: 'burhanuddin5023@gmail.com',
      password: '123',
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: error.message });
  }
});

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }
});

module.exports = router;
