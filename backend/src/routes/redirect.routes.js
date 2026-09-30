const router = require("express").Router();
const { redirectToOriginal } = require("../controllers/url.controller");

router.get("/:shortId", redirectToOriginal);

module.exports = router;
