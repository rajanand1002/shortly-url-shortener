const router = require("express").Router();
const { createShortUrl, getAnalytics } = require("../controllers/url.controller");

router.post("/", createShortUrl);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
