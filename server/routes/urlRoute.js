const express = require('express');
const getUrl = require('../controllers/urlController');

const router = express.Router();

router.get("/url", getUrl);

module.exports = router;



