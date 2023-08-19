const express = require('express');
const {getUrl, goToUrl} = require('../controllers/urlController');

const router = express.Router();

router.post("/url", getUrl);
router.get("/:url", goToUrl);

module.exports = router;



