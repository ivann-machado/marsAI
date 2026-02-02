import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'login OK' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'register OK' });
});

export default router;
