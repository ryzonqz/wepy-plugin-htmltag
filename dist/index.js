'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _transform = require('./transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WepyPluginTag = function () {
  function WepyPluginTag() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WepyPluginTag);

    this.setting = Object.assign(_config2.default, opts);
  }

  _createClass(WepyPluginTag, [{
    key: 'apply',
    value: function apply(op) {
      var setting = this.setting;
      if (/\.wxss$/.test(op.file)) {
        op.code = (0, _transform.transformSelector)(op.code, setting);
      }
      if (/\.wxml$/.test(op.file)) {
        op.code = (0, _transform.transformTag)(op.code, setting);
      }

      op.next();
    }
  }]);

  return WepyPluginTag;
}();

exports.default = WepyPluginTag;