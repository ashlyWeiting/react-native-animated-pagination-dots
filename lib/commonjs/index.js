"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Dot = _interopRequireDefault(require("./component/Dot"));
var _EmptyDot = _interopRequireWildcard(require("./component/EmptyDot"));
var _usePrevious = _interopRequireDefault(require("react-use/lib/usePrevious"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */

const ONE_EMPTY_DOT_SIZE = _EmptyDot.defaultEmptyDotSize * _EmptyDot.defaultEmptyDotSize;
const DotContainer = props => {
  const refScrollView = (0, _react.useRef)(null);
  const prevPage = (0, _usePrevious.default)(props.curPage);
  const getSizeRatio = (0, _react.useCallback)(() => {
    if (!props.sizeRatio) return 1.0;
    return Math.max(1.0, props.sizeRatio);
  }, [props.sizeRatio]);
  const scrollTo = (0, _react.useCallback)((index, animated = true) => {
    if (!refScrollView.current) return;
    const sizeRatio = getSizeRatio();
    const FIRST_EMPTY_DOT_SPACE = ONE_EMPTY_DOT_SIZE * 2;
    const MOVE_DISTANCE = ONE_EMPTY_DOT_SIZE * sizeRatio;
    const moveTo = Math.max(0, FIRST_EMPTY_DOT_SPACE + (index - 4) * MOVE_DISTANCE);
    if (props.vertical) {
      refScrollView.current.scrollTo({
        x: 0,
        y: moveTo,
        animated
      });
      return;
    }
    refScrollView.current.scrollTo({
      x: moveTo,
      y: 0,
      animated
    });
  }, [getSizeRatio, props.vertical]);
  const getContainerStyle = (0, _react.useCallback)(() => {
    const {
      vertical
    } = props;
    const sizeRatio = getSizeRatio();
    const containerSize = 84 * sizeRatio;
    return {
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
      maxHeight: vertical ? containerSize : undefined,
      maxWidth: vertical ? undefined : containerSize
    };
  }, [getSizeRatio, props]);
  (0, _react.useEffect)(() => {
    if (props.maxPage > 4 && prevPage !== props.curPage) scrollTo(props.curPage);
  }, [prevPage, props.curPage, props.maxPage, scrollTo]);
  const {
    curPage,
    maxPage,
    activeDotColor,
    inactiveDotColor
  } = props;
  const list = (0, _react.useMemo)(() => [...Array(maxPage).keys()], [maxPage]);
  let normalizedPage = curPage;
  if (curPage < 0) {
    normalizedPage = 0;
  }
  if (curPage > maxPage - 1) {
    normalizedPage = maxPage - 1;
  }
  const sizeRatio = getSizeRatio();
  const container = getContainerStyle();
  if (maxPage < 5) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: container
    }, list.map(i => {
      return /*#__PURE__*/_react.default.createElement(_Dot.default, {
        key: i,
        idx: i,
        sizeRatio: sizeRatio,
        curPage: normalizedPage,
        maxPage: maxPage,
        activeColor: activeDotColor,
        inactiveColor: inactiveDotColor
      });
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: container,
    onLayout: () => {
      // scroll to right index on initial render
      scrollTo(props.curPage, false);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    ref: refScrollView,
    contentContainerStyle: styles.scrollViewContainer,
    bounces: false,
    horizontal: !props.vertical,
    scrollEnabled: false,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false
  }, /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
    sizeRatio: sizeRatio
  }), /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
    sizeRatio: sizeRatio
  }), list.map(i => {
    return /*#__PURE__*/_react.default.createElement(_Dot.default, {
      sizeRatio: sizeRatio,
      key: i,
      idx: i,
      curPage: normalizedPage,
      maxPage: maxPage,
      activeColor: activeDotColor,
      inactiveColor: inactiveDotColor,
      onPress: props.onPress
    });
  }), /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
    sizeRatio: sizeRatio
  }), /*#__PURE__*/_react.default.createElement(_EmptyDot.default, {
    sizeRatio: sizeRatio
  })));
};
const styles = _reactNative.StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center'
  }
});
var _default = exports.default = DotContainer;
//# sourceMappingURL=index.js.map