const Film = require('../models/film.model');

exports.createFilm = async (req, res) => {
  const id = await Film.create(req.body);
  res.status(201).json({ message: 'Film créé', id });
};

exports.getFilms = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const films = await Film.findPaginated(page);
  res.json({ page, count: films.length, films });
};

exports.getFilm = async (req, res) => {
  const film = await Film.findById(req.params.id);
  if (!film) return res.status(404).json({ message: 'Film introuvable' });
  res.json(film);
};

exports.updateFilm = async (req, res) => {
  await Film.update(req.params.id, req.body);
  res.json({ message: 'Film modifié' });
};

exports.deleteFilm = async (req, res) => {
  await Film.delete(req.params.id);
  res.json({ message: 'Film supprimé' });
};
