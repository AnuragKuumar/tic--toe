const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authJwt');

router.get('/profile', verifyToken, (req, res) => {
  // Here req.userId is available after verification
  res.json({ message: `Welcome user with ID: ${req.userId}` });
});

module.exports = router;
