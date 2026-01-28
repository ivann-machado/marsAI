const CountryModel = require("../models/country");
//const fs = require("fs");

exports.getCountry = (req, res, next) => {
  CountryModel.findAll()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
