const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcrypt")
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
})
userSchema.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})
// 用户登录的时候调用该方法 示例：const isMatch = await user.matchPassword(password)
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User
