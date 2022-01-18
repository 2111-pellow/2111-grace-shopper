const User = require("./db/models/User");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('token in middleware', token)
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  if(!req.user.isAdmin) {
  res.send('You dont have access!')
  }
}

module.exports =
{ requireToken, isAdmin };
