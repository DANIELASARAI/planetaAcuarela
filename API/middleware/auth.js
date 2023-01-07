const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send("Accesso denegado al Planeta. Sin Autentificación...");

  try {
    const secretKey = process.env.JWT_SECRET;
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Accesso denegado. Token Inválido...");
    console.log(error.message);
  }
};
const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Accesso denegeado. Sin Authorización");
    }
  });
};
module.exports = { auth, isAdmin };
