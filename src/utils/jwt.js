const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: process.env.JWT_EXPERIE_IN,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
