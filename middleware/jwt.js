const jwt = require("jsonwebtoken");

exports.validateJwt = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res.status(400).json({ message: "Token in required" });
    }

    jwt.verify(token, req.app.get("secret"), function (err, decoded) {
      if (err) {
        return res.status(400).json({ err });
      }

      req.body.userId = decoded._id;
      next();
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
