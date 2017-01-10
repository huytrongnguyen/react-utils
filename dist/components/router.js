'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _collection = require('./../core/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = exports.Route = function (_Component) {
  _inherits(Route, _Component);

  function Route(props) {
    _classCallCheck(this, Route);

    return _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this, props));
  }

  _createClass(Route, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Route;
}(_react.Component);

var Router = exports.Router = function (_Component2) {
  _inherits(Router, _Component2);

  function Router(props) {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));
  }

  _createClass(Router, [{
    key: 'render',
    value: function render() {
      if (!this.props.component) {
        console.error('component props should not be null');
      }
      this.createTransitionManager();
      return this.props.component;
    }
  }, {
    key: 'createTransitionManager',
    value: function createTransitionManager() {
      var children = this.props.children;

      _collection.List.of(children).each(function (route) {
        if (route.props && route.props.path && route.props.component) {
          console.log('path = ' + route.props.path + ', component = ' + route.props.component);
          console.log(route);
        }
      });
    }
  }]);

  return Router;
}(_react.Component);