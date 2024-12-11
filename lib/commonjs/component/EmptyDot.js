"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEmptyDotSize = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Created by rouge on 11/09/2019.
 * Converted to Functional component. on 21/09/2021
 */

const defaultEmptyDotSize = exports.defaultEmptyDotSize = 3;
const EmptyDot = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.base, {
      width: defaultEmptyDotSize * props.sizeRatio,
      height: defaultEmptyDotSize * props.sizeRatio,
      margin: defaultEmptyDotSize * props.sizeRatio
    }]
  });
};
const styles = _reactNative.StyleSheet.create({
  base: {
    backgroundColor: 'white',
    opacity: 0.0
  }
});
var _default = exports.default = EmptyDot;
//# sourceMappingURL=EmptyDot.js.map