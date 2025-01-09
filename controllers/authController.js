const User = require("../models/User")

async function registerUser(req, res) {
  const { firstName, lastName, username, password } = req.body
  try {
    const duplicate = await User.findOne({ username })
    if (duplicate) {
      return res.status(400).json({ message: "username already exists" })
    }
    const user = new User({ firstName, lastName, username, password })
    await user.save()
    res.status(201).json({ message: "user created successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "server error" })
  }
}
const AuthController = {
  registerUser,
}
module.exports = AuthController
