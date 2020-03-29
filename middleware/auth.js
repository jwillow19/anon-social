const jwt = require('jsonwebtoken');
const config = require('config');

// exports a middleware function that authenticates user with JWT
// from header by setting req.user to the decoded id.
module.exports = function(req, res, next) {
  // grab token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Token DNE, authorizaton denied' });
  }

  try {
    // verify token with jwt.verify
    // set req.user to be user.id in the payload of the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;

    next();
  } catch {
    // if theres is token but invalid
    res.status(401).json({ msg: 'Invalid token' });
  }
};
