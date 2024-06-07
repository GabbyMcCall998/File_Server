const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { users } = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Signup Route
router.post('/signup', [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password length must be greater than 5 characters').isLength({ min: 6 })
], async (req, res) => {
  const { password, email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = users.find(user => user.email === email);
  if (user) {
    return res.status(400).json({ errors: [{ msg: 'This user already exists' }] });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  const token = await JWT.sign({ email }, 'tehvlydgukjhyukjbh', { expiresIn: 900 });
  res.json({ token });
});


// Login Route
router.post('/login', async (req, res) => {
  const { password, email } = req.body;
  let user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
  }
  const token = await JWT.sign({ email }, 'tehvlydgukjhyukjbh', { expiresIn: 900 });
  res.json({ token });
});

router.get('/all', (req, res) => {
  res.json(users);
});

module.exports = router;
