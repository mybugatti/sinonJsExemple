module.exports = {

  evolution: function (a, b) {
    return 100 * (b-a) / a
  },

  wait: function (time, callback) {
    setTimeout(function () {
      callback(18)
    }, time)
  }
};