function normalizeUrl(input) {
  if (typeof input !== "string") return null;
  try {
    const url = new URL(input.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

module.exports = normalizeUrl;
