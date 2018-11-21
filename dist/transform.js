'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformCss = exports.transformHtml = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//adjust class
var adjustClass = function adjustClass(attrs, tag) {
  var classReg = new RegExp('(class=")([^"]*)"');
  if (!classReg.test(attrs)) {
    return ' class="_' + tag + '"' + attrs;
  }
  return attrs.replace(classReg, function (match, $1, $2) {
    return $1 + ('_' + tag + ' ') + $2 + '"';
  });
};

//some tag need new close
var closeTag = function closeTag(tag) {
  if (tag === 'hr') return '</view>';
  if (tag === 'img') return '</image>';
  return '';
};

var TagTransform = function () {
  function TagTransform() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TagTransform);

    var opt = Object.assign(_config.rule, opts);

    var arr = opt.block.concat(opt.inline);
    var joins = arr.join('|');

    //style and html regexp
    this.selectorReg = new RegExp('(^|[^\\.])(\\b' + joins + ')\\b', 'g');
    this.tagStartReg = new RegExp('<(' + joins + ')((\\s+(@|\\.|\\:|\\-|\\w)+(="[^"]*")?)*)\\s*(\\/)?>', 'g');
    this.tagEndReg = new RegExp('<\\/s*(' + joins + ')s*>', 'g');

    this.weTags = {};
    opt.block.forEach(function (t) {
      return _this.weTags[t] = 'view';
    });
    opt.inline.forEach(function (t) {
      return _this.weTags[t] = 'text';
    });
    if (this.weTags.img) this.weTags.img = 'image';
  }

  //replace selector tag


  _createClass(TagTransform, [{
    key: 'replaceSelector',
    value: function replaceSelector(selector) {
      return selector.replace(this.selectorReg, function (matach, $1, $2) {
        return $1 + '._' + $2;
      });
    }

    //replace html tag

  }, {
    key: 'replaceTag',
    value: function replaceTag(html) {
      var _this2 = this;

      return html.replace(this.tagStartReg, function (match, $1, $2) {
        if ($1 === 'br') return '<text>\n</text>';
        return '<' + _this2.weappTag($1) + adjustClass($2, $1) + '>' + closeTag($1);
      }).replace(this.tagEndReg, function (match, $1) {
        return '</' + _this2.weappTag($1) + '>';
      });
    }

    //html tag transform to view|text|image

  }, {
    key: 'weappTag',
    value: function weappTag(tag) {
      return this.weTags[tag];
    }
  }]);

  return TagTransform;
}();

var transformHtml = function transformHtml(content, setting) {
  var tt = new TagTransform(setting);

  return tt.replaceTag(content);
};

var transformCss = function transformCss(content, setting) {
  var tt = new TagTransform(setting);
  var astObj = _css2.default.parse(content);

  astObj.stylesheet.rules.forEach(function (rule) {
    switch (rule.type) {
      // recursive invocation while dealing with media queries
      case 'media':
        transformCss(rule.rules);
        break;
      // recursive invocation while dealing with keyframes
      case 'keyframes':
        transformCss(rule.keyframes);
        break;
      default:
        if (rule.selectors && rule.selectors.length) {
          // need transform: selector
          rule.selectors = rule.selectors.map(function (selector) {
            return tt.replaceSelector(selector);
          });
        }
    }
  });

  return _css2.default.stringify(astObj);
};

exports.transformHtml = transformHtml;
exports.transformCss = transformCss;