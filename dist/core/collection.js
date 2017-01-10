"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMPTY_LIST = [];

var List = exports.List = function () {
  function List(value) {
    _classCallCheck(this, List);

    if (!value) {
      return EMPTY_LIST;
    }
    this.array = value;
    return this;
  }

  _createClass(List, [{
    key: "each",
    value: function each(fn) {
      for (var index = 0; index < this.array.length; ++index) {
        fn(this.array[index], index);
      }
    }
  }], [{
    key: "of",
    value: function of() /*...values*/{
      return new List(arguments);
    }
  }]);

  return List;
}();