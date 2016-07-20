(function () {
  'use strict'

  angular
    .module('myApp')
    .controller('usersController', usersController)

  function usersController (userFactory) {
    var _this = this
    _this.user = null
    _this.register = function () {
      userFactory.register(_this.regInfo, function (factoryData) {
        if (factoryData.data.status) {
          console.log(factoryData.data)
          _this.user = factoryData.data.userInfo
        } else {
          _this.errors = factoryData.data.errors
        }
      })
    }
  }
})()
