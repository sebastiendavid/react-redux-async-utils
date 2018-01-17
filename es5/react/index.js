"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = makeAsyncComponent;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _regeneratorRuntime = require("regenerator-runtime");

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _promise = require("../utils/promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line


function makeAsyncComponent(fetchComponent) {
  var AsyncComponent = function (_Component) {
    _inherits(AsyncComponent, _Component);

    function AsyncComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, AsyncComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AsyncComponent, [{
      key: "componentWillMount",
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee() {
          var _makeCancellable, promise, cancel, Loaded;

          return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _makeCancellable = (0, _promise.makeCancellable)(fetchComponent()), promise = _makeCancellable.promise, cancel = _makeCancellable.cancel;

                  this.setState({ cancel: cancel });
                  _context.next = 5;
                  return promise;

                case 5:
                  Loaded = _context.sent;

                  this.setState({
                    Loaded: Loaded,
                    cancel: null
                  });
                  _context.next = 12;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](0);

                  if (!_context.t0.isCancelled) {
                    console.error(_context.t0);
                  }

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 9]]);
        }));

        function componentWillMount() {
          return _ref2.apply(this, arguments);
        }

        return componentWillMount;
      }()
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (typeof this.state.cancel === "function") {
          this.state.cancel();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var Loaded = this.state.Loaded;

        return !!Loaded && _react2.default.createElement(Loaded, this.props);
      }
    }]);

    return AsyncComponent;
  }(_react.Component);

  return AsyncComponent;
}