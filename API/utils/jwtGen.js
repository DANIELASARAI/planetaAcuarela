const jwt = require("jsonwebtoken");

const jwtGen = (user) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretKey
  );
  return token;
};

module.exports = jwtGen;
