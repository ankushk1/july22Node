const User = require("../model/User");

exports.signup = async (req, res) => {

  console.log(req.body)

  const user = await User.create(req.body)
  return res.json({user})
};



