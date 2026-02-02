const express = require('express');
const {
  createFilm,
  getFilms,
  getFilm,
  updateFilm,
  deleteFilm
} = require('../controllers/film.controller');

const router = express.Router();

router.get('/', getFilms);
router.post('/', createFilm);
router.get('/:id', getFilm);
router.put('/:id', updateFilm);
router.delete('/:id', deleteFilm);

module.exports = router;
