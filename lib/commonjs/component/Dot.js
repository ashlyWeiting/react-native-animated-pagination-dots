"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _usePrevious = _interopRequireDefault(require("react-use/lib/usePrevious"));
var _EmptyDot = _interopRequireDefault(require("./EmptyDot"));
var _DotUtils = require("../util/DotUtils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
const Dot = props => {
  const [animVal] = (0, _react.useState)(new _reactNative.Animated.Value(0));
  const [animate, setAnimate] = (0, _react.useState)(false);
  const [type, setType] = (0, _react.useState)(() => (0, _DotUtils.getDotStyle)({
    idx: props.idx,
    curPage: props.curPage,
    maxPage: props.maxPage
  }));
  const [dotColor, setDotColor] = (0, _react.useState)(() => {
    if (props.curPage === props.idx) {
      //its current active page now
      return props.activeColor;
    }
    return props.inactiveColor ?? props.activeColor;
  });
  const prevType = (0, _usePrevious.default)(type);
  const prevDotColor = (0, _usePrevious.default)(dotColor);
  (0, _react.useEffect)(() => {
    const nextType = (0, _DotUtils.getDotStyle)({
      idx: props.idx,
      curPage: props.curPage,
      maxPage: props.maxPage
    });
    const nextAnimate = nextType.size !== ((prevType === null || prevType === void 0 ? void 0 : prevType.size) || 3) || nextType.opacity !== ((prevType === null || prevType === void 0 ? void 0 : prevType.opacity) || 0.2);
    if (props.curPage === props.idx) {
      setDotColor(props.activeColor);
    } else {
      setDotColor(props.inactiveColor ?? props.activeColor);
    }
    setType(nextType);
    setAnimate(nextAnimate);
  }, [prevType === null || prevType === void 0 ? void 0 : prevType.opacity, prevType === null || prevType === void 0 ? void 0 : prevType.size, props.activeColor, props.curPage, props.idx, props.inactiveColor, props.maxPage]);
  (0, _react.useEffect)(() => {
    if (!animate) return;
    animVal.setValue(0);
    _reactNative.Animated.timing(animVal, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [animVal, animate, prevType, type]);
  const animStyle = (0, _react.useMemo)(() => {
    const size = animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [((prevType === null || prevType === void 0 ? void 0 : prevType.size) || 3) * props.sizeRatio, type.size * props.sizeRatio]
    });
    const backgroundColor = animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [prevDotColor ?? props.activeColor, dotColor]
    });
    return {
      width: size,
      height: size,
      backgroundColor,
      borderRadius: animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [((prevType === null || prevType === void 0 ? void 0 : prevType.size) || 3) * props.sizeRatio * 0.5, type.size * props.sizeRatio * 0.5]
      }),
      opacity: animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [(prevType === null || prevType === void 0 ? void 0 : prevType.opacity) || 0.2, type.opacity]
      })
    };
  }, [animVal, dotColor, prevDotColor, prevType === null || prevType === void 0 ? void 0 : prevType.opacity, prevType === null || prevType === void 0 ? void 0 : prevType.size, props.activeColor, props.sizeRatio, type.opacity, type.size]);
  if (props.curPage < 3) {
    if (props.idx >= 5) return /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
      sizeRatio: props.sizeRatio
    });
  } else if (props.curPage < 4) {
    if (props.idx > 5) return /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
      sizeRatio: props.sizeRatio
    });
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, _extends({}, props.getAccessibilityProps && props.getAccessibilityProps(props.idx), {
    onPress: () => {
      var _props$onPress;
      (_props$onPress = props.onPress) === null || _props$onPress === void 0 || _props$onPress.call(props, props.idx);
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [{
      margin: 3 * props.sizeRatio
    }, animStyle]
  }));
};
var _default = exports.default = Dot;
//# sourceMappingURL=Dot.js.map