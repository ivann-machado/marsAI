const express = require("express");
const router = express.Router();
const indexCtrl = require("../controllers/country");

router.get("/", indexCtrl.getCountry);

module.exports = router;
