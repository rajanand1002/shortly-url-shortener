const Url = require("../models/Url");
const { baseUrl } = require("../config");
const { generateShortId, SHORT_ID_PATTERN } = require("../utils/shortId");
const normalizeUrl = require("../utils/normalizeUrl");

const MAX_ATTEMPTS = 5;
const notFound = (res) => res.status(404).json({ error: "Short URL not found." });

// POST /url
async function createShortUrl(req, res, next) {
  try {
    if (!req.body?.url) return res.status(400).json({ error: "URL is required." });

    const redirectURL = normalizeUrl(req.body.url);
    if (!redirectURL) {
      return res.status(400).json({ error: "Enter a valid http:// or https:// URL." });
    }

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        const doc = await Url.create({ shortId: generateShortId(), redirectURL });
        return res.status(201).json({
          id: doc.shortId,
          shortUrl: `${baseUrl}/${doc.shortId}`,
          redirectURL,
        });
      } catch (err) {
        if (err.code !== 11000) throw err; // retry only on a duplicate shortId
      }
    }
    throw new Error("Could not generate a unique short ID.");
  } catch (err) {
    next(err);
  }
}

// GET /url/analytics/:shortId
async function getAnalytics(req, res, next) {
  try {
    const { shortId } = req.params;
    if (!SHORT_ID_PATTERN.test(shortId)) return notFound(res);

    const doc = await Url.findOne({ shortId }).lean();
    if (!doc) return notFound(res);

    res.json({
      id: doc.shortId,
      redirectURL: doc.redirectURL,
      createdAt: doc.createdAt,
      totalClicks: doc.visitHistory.length,
      analytics: doc.visitHistory,
    });
  } catch (err) {
    next(err);
  }
}

// GET /:shortId -> records the visit, then redirects
async function redirectToOriginal(req, res, next) {
  try {
    const { shortId } = req.params;
    if (!SHORT_ID_PATTERN.test(shortId)) return notFound(res);

    const doc = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!doc) return notFound(res);

    res.redirect(doc.redirectURL);
  } catch (err) {
    next(err);
  }
}

module.exports = { createShortUrl, getAnalytics, redirectToOriginal };
