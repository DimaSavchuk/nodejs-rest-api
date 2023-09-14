const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarUpdate = require("./avatarUpdate");
const verify = require("./verify");
const reverify = require("./reverify");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  subscriptionUpdate,
  avatarUpdate,
  verify,
  reverify,
};
