"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPieces = getPieces;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPieces(fInterval, tInterval, interval) {
  var fromInterval = fInterval.split(':');
  var toInterval = tInterval.split(':');
  var momentFrom = (0, _moment["default"])().hours(fromInterval[0]).minutes(fromInterval[1]);
  var momentTo = (0, _moment["default"])().hours(toInterval[0]).minutes(toInterval[1]);

  var duration = _moment["default"].duration(Number(interval.slice(0, -1)), interval.slice(-1));

  var ints = [];
  var step = momentFrom;

  while (step.isBefore(momentTo)) {
    ints.push(step.format('HH:mm'));
    step = step.add(duration);
  }

  return ints;
}

var Labels =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Labels, _React$Component);

  function Labels() {
    _classCallCheck(this, Labels);

    return _possibleConstructorReturn(this, _getPrototypeOf(Labels).apply(this, arguments));
  }

  _createClass(Labels, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fromInterval = _this$props.fromInterval,
          toInterval = _this$props.toInterval,
          interval = _this$props.interval;
      var intervals = getPieces(fromInterval, toInterval, interval).map(function (_int) {
        return _react["default"].createElement("div", {
          className: "ranges-label",
          key: _int
        }, _int);
      });
      return _react["default"].createElement("div", {
        className: "labels-container"
      }, intervals);
    }
  }]);

  return Labels;
}(_react["default"].Component);

_defineProperty(Labels, "propTypes", {
  fromInterval: _propTypes["default"].string,
  toInterval: _propTypes["default"].string,
  interval: _propTypes["default"].string
});

_defineProperty(Labels, "defaultProps", {
  fromInterval: '00:00',
  toInterval: '23:30',
  interval: '30m'
});

var _default = Labels;
exports["default"] = _default;