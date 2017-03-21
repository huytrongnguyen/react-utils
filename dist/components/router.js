'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = exports.Router = exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _list = require('./../core/list');

var _list2 = _interopRequireDefault(_list);

var _route = require('./../decorators/route');

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
      var component = this.props.component;
      if (!component) {
        console.error('component props should not be null');
      }
      return new component();
    }
  }]);

  return Route;
}(_react.Component);

var Router = exports.Router = function (_Component2) {
  _inherits(Router, _Component2);

  function Router(props) {
    _classCallCheck(this, Router);

    var _this2 = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));

    _this2.state = { route: window.location.hash.substring(1) };
    _this2.createTransitionManager();
    return _this2;
  }

  _createClass(Router, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      window.addEventListener('hashchange', function () {
        _this3.setState(function () {
          return { route: window.location.hash.substring(1) };
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var component = this.props.component;
      var route = this.state.route,
          child = _route.routes['*'];

      route = route.toLowerCase();
      if (route && _route.routes[route]) {
        child = _route.routes[route];
      }
      return _react2.default.createElement(component || 'div', {}, _react2.default.createElement(child, {}, null));
    }
  }, {
    key: 'createTransitionManager',
    value: function createTransitionManager() {
      var children = this.props.children;

      _list2.default.of(children).each(function (route) {
        if (route.props && route.props.path && route.props.component) {
          _route.routes[route.props.path] = route.props.component;
        }
      });
    }
  }]);

  return Router;
}(_react.Component);

var Link = exports.Link = function (_Component3) {
  _inherits(Link, _Component3);

  function Link(props) {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var route = window.location.hash.substring(1),
          _props = this.props,
          to = _props.to,
          className = _props.className,
          activeClassName = _props.activeClassName,
          children = _props.children;


      var link = to || '',
          cls = className;

      if (link === route && activeClassName) {
        cls += ' ' + activeClassName;
      }

      return _react2.default.createElement(
        'a',
        { href: '#' + link, className: cls },
        children
      );
    }
  }]);

  return Link;
}(_react.Component);