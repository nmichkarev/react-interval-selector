"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Interval = _interopRequireDefault(require("./Interval"));

var _Labels = _interopRequireWildcard(require("./Labels"));

require("./styles.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReactIntervalSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactIntervalSelector, _React$Component);

  function ReactIntervalSelector(props) {
    var _this;

    _classCallCheck(this, ReactIntervalSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactIntervalSelector).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleAreaMouseDown", function (e) {
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "handleIntervalMouseDown", function (i, e) {
      var selected = _this.state.selected;
      _this.clickOnSelected = selected[i];

      _this.setState({
        startedOn: i,
        pulledTo: i
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAreaMouseUp", function (e) {
      if (_this.state.startedOn === null) return;

      _this.selectInterval(_this.state.startedOn, _this.state.pulledTo);
    });

    _defineProperty(_assertThisInitialized(_this), "handleIntervalMouseEnter", function (i, e) {
      if (_this.state.startedOn !== null) {
        _this.setState({
          pulledTo: i
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleIntervalMouseLeave", function (i, e) {});

    _defineProperty(_assertThisInitialized(_this), "handleAreaMouseLeave", function (e) {
      _this.setState({
        pulledTo: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchStart", function (e) {});

    var intervalsFactory = props.intervalsFactory,
        fromInterval = props.fromInterval,
        toInterval = props.toInterval,
        interval = props.interval;
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    var intervals;

    try {
      intervals = intervalsFactory(fromInterval, toInterval, interval);
      if (!Array.isArray(intervals)) throw new Error('Function should return an array');
    } catch (e) {
      throw e;
    }

    var _selected = [];

    for (var i = 0; i < intervals.length; i++) {
      _selected[i] = false;
    }

    _this.state = {
      selected: _selected,
      startedOn: null,
      pulledTo: null,
      intervals: intervals
    };
    return _this;
  }

  _createClass(ReactIntervalSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(e) {
      this.setState({
        startedOn: null,
        pulledTo: null
      });
      this.clickOnSelected = false;
    }
  }, {
    key: "selectInterval",
    value: function selectInterval(first, last) {
      var selected = this.state.selected;
      var newSelected = selected.slice(0);
      var fromI = first < last ? first : last;
      var toI = first < last ? last : first;
      var value = !this.clickOnSelected;

      for (var i = fromI; i <= toI; i++) {
        newSelected[i] = value;
      }

      this.setState({
        selected: newSelected
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          selected = _this$state.selected,
          startedOn = _this$state.startedOn,
          pulledTo = _this$state.pulledTo,
          intervals = _this$state.intervals;
      var clickOnSelected = this.clickOnSelected;
      var ranges = selected.map(function (v, k) {
        var intSelected = v;

        if (startedOn !== null && pulledTo !== null) {
          if (startedOn < pulledTo) {
            if (k <= pulledTo && k >= startedOn) intSelected = !clickOnSelected;
          } else {
            if (k >= pulledTo && k <= startedOn) intSelected = !clickOnSelected;
          }
        }

        return _react["default"].createElement(_Interval["default"], {
          onMouseDown: _this2.handleIntervalMouseDown.bind(null, k),
          onMouseEnter: _this2.handleIntervalMouseEnter.bind(null, k),
          onMouseLeave: _this2.handleIntervalMouseLeave.bind(null, k),
          selected: intSelected,
          text: intervals[k],
          key: k
        });
      });
      return _react["default"].createElement("div", {
        className: "ranges",
        onMouseDown: this.handleAreaMouseDown,
        onMouseUp: this.handleAreaMouseUp,
        onMouseLeave: this.handleAreaMouseLeave
      }, _react["default"].createElement("div", {
        className: "ranges-container"
      }, ranges));
    }
  }]);

  return ReactIntervalSelector;
}(_react["default"].Component);

_defineProperty(ReactIntervalSelector, "propTypes", {
  count: _propTypes["default"].number,
  intervalsFactory: _propTypes["default"].func,
  fromInterval: _propTypes["default"].any,
  toInterval: _propTypes["default"].any,
  interval: _propTypes["default"].any
});

_defineProperty(ReactIntervalSelector, "defaultProps", {
  count: 48,
  intervalsFactory: _Labels.getPieces,
  fromInterval: '00:00',
  toInterval: '24:00',
  interval: '30m'
});

;
var _default = ReactIntervalSelector;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Label = _interopRequireDefault(require("./Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interval =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Interval, _React$Component);

  function Interval() {
    _classCallCheck(this, Interval);

    return _possibleConstructorReturn(this, _getPrototypeOf(Interval).apply(this, arguments));
  }

  _createClass(Interval, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selected = _this$props.selected,
          text = _this$props.text;
      var selectedCN = selected ? ' selected' : '';
      return _react["default"].createElement("div", {
        className: "ranges-container__range"
      }, _react["default"].createElement("div", _extends({
        className: "range-interval".concat(selectedCN)
      }, this.props)), _react["default"].createElement(_Label["default"], {
        text: text
      }));
    }
  }]);

  return Interval;
}(_react["default"].Component);

_defineProperty(Interval, "propTypes", {
  selected: _propTypes["default"].bool,
  text: _propTypes["default"].string
});

_defineProperty(Interval, "defaultProps", {
  text: ''
});

var _default = Interval;
exports["default"] = _default;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Label = function Label(props) {
  return _react["default"].createElement("span", {
    className: "ranges-container__range__label"
  }, props.text);
};

var _default = Label;
exports["default"] = _default;
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
  toInterval: '24:00',
  interval: '30m'
});

var _default = Labels;
exports["default"] = _default;
