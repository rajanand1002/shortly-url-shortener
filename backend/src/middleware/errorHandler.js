module.exports = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON." });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
};
