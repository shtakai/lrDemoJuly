var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  register: function (req, res) {
    var user = new User(req.body)
    user.save(function (err) {
      if (err) res.json({status: false, errors: err })
      else {
        req.session['userInfo'] = {
          id: user._id,
          first_name: user.first_name
        }
        res.json({status: true, userInfo: req.session['userInfo']})
      }
    })
  },
  login: function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) res.json({status: false, errors: err})
      else if (user) {
        if (user.validPassword(req.body.password)) {
          req.session['userInfo'] = {
            id: user._id,
            first_name: user.first_name
          }
          res.json({status: true, userInfo: req.session['userInfo']})
        }
      } else {
        res.json({status: false, errors: 'User not found'})
      }
    })
  },
  logout: function (req, res) {
    req.session.destroy(function (err) {
      if (err) res.json({status: false, errors: err})
      res.json({status: true})
    })
  }
}
