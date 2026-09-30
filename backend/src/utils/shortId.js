const { randomInt } = require("crypto");

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SHORT_ID_PATTERN = /^[A-Za-z0-9]{8}$/;


function generateShortId(length = 8) {
  let id = "";
  for (let i = 0; i < length; i++) id += ALPHABET[randomInt(ALPHABET.length)];
  return id;
}

module.exports = { generateShortId, SHORT_ID_PATTERN };
